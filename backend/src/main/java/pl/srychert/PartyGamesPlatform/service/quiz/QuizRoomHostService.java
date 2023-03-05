package pl.srychert.PartyGamesPlatform.service.quiz;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.OngoingQuizMockDB;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.Game;
import pl.srychert.PartyGamesPlatform.model.Question;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.model.quiz.QuizState;
import pl.srychert.PartyGamesPlatform.service.GameService;

import java.util.Optional;

@Service
public class QuizRoomHostService {
    @Autowired
    GameService gameService;

    @Autowired
    QuizStateService quizStateService;

    public TextMessageDTO handleMessage(String name, TextMessageDTO textMessageDTO, String pin) {
        return switch (textMessageDTO.getType()) {
            case CREATE_ROOM -> handleCreateRoom(name, textMessageDTO);
            case START_GAME -> handleStartGame(name, textMessageDTO, pin);
            default -> null;
        };
    }

    private TextMessageDTO handleCreateRoom(String name, TextMessageDTO textMessageDTO) {
        System.out.println("Create room, id:  " + name);
        String pin = null;
        Optional<Game> game = gameService.getGame(textMessageDTO.getContent());

        if (game.isPresent()) {
            pin = quizStateService.getUnusedPin(name, textMessageDTO.getContent());
        }

        if (pin == null) {
            return TextMessageDTO.builder()
                    .type(MessageType.NO_PIN)
                    .sender("SERVER").build();
        }

        return TextMessageDTO.builder()
                .type(MessageType.CREATED)
                .content(pin)
                .sender("SERVER").build();
    }

    private TextMessageDTO handleStartGame(String name, TextMessageDTO textMessageDTO, String pin) {
        QuizState quiz = OngoingQuizMockDB.quizes.get(pin);
        quiz.setHostId(name);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("players", quiz.getPlayers());

        Question question = null;
        Optional<Game> game = gameService.getGame(quiz.getGameId());

        if (game.isPresent()) {
            question = game.get().getQuestions().get(0);

            jsonObject.put("question", new JSONObject()
                    .put("question", question.getQuestion())
                    .put("type", question.getType())
                    .put("answers", question.getAnswers())
                    .put("correct", question.getCorrect()));
        }


        return TextMessageDTO.builder()
                .type(MessageType.STARTED)
                .json(jsonObject.toString())
                .content("")
                .sender("SERVER").build();
    }
}
