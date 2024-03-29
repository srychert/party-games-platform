package pl.srychert.PartyGamesPlatform.service.quiz;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.OngoingQuizMockDB;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.model.quiz.Question;
import pl.srychert.PartyGamesPlatform.model.quiz.Quiz;
import pl.srychert.PartyGamesPlatform.model.quiz.QuizPlayer;
import pl.srychert.PartyGamesPlatform.model.quiz.QuizState;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class QuizRoomHostService {
    @Autowired
    QuizService quizService;

    @Autowired
    QuizStateService quizStateService;

    public TextMessageDTO handleMessage(String name, TextMessageDTO textMessageDTO, String pin) {
        return switch (textMessageDTO.getType()) {
            case CREATE_ROOM -> handleCreateRoom(name, textMessageDTO);
            case START_GAME -> handleStartGame(name, textMessageDTO, pin);
            case NEXT_ROUND -> handleNextRound(name, textMessageDTO, pin);
            default -> null;
        };
    }

    private TextMessageDTO handleCreateRoom(String name, TextMessageDTO textMessageDTO) {
        String pin = null;
        Optional<Quiz> quiz = quizService.getQuiz(textMessageDTO.getContent());

        if (quiz.isPresent()) {
            pin = quizStateService.getUnusedPin(name, textMessageDTO.getContent(), quiz.get().getQuestions());
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

    private JSONObject createRoundJSONObject(List<QuizPlayer> players, Question question) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("players", players);
        jsonObject.put("question", new JSONObject());

        if (question != null) {
            jsonObject.put("question", new JSONObject()
                    .put("question", question.getQuestion())
                    .put("type", question.getType())
                    .put("answers", question.getAnswers())
                    .put("correct", question.getCorrect()));
        }

        return jsonObject;
    }

    private TextMessageDTO handleStartGame(String name, TextMessageDTO textMessageDTO, String pin) {
        QuizState quiz = OngoingQuizMockDB.quizzes.get(pin);

        if (quiz == null) {
            return TextMessageDTO.builder()
                    .type(MessageType.ERROR)
                    .content("No Quiz")
                    .sender("SERVER").build();
        }

        JSONObject jsonObject = createRoundJSONObject(quiz.getPlayers(), quiz.getQuestions().get(0));
        quizService.incrementTotalTimesPlayed(quiz.getGameId());

        return TextMessageDTO.builder()
                .type(MessageType.STARTED)
                .json(jsonObject.toString())
                .content("")
                .sender("SERVER").build();
    }

    private TextMessageDTO handleNextRound(String name, TextMessageDTO textMessageDTO, String pin) {
        QuizState quiz = OngoingQuizMockDB.quizzes.get(pin);

        try {

            Question question = quiz.getQuestions().get(quiz.getRound() + 1);
            JSONObject jsonObject = createRoundJSONObject(quiz.getPlayers(), question);

            quiz.setRound(quiz.getRound() + 1);

            return TextMessageDTO.builder()
                    .type(MessageType.NEXT_ROUND)
                    .json(jsonObject.toString())
                    .sender("SERVER").build();

        } catch (IndexOutOfBoundsException e) {
            JSONObject jsonObject = createRoundJSONObject(quiz.getPlayers(), null);

            return TextMessageDTO.builder()
                    .type(MessageType.ENDED)
                    .json(jsonObject.toString())
                    .sender("SERVER").build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return TextMessageDTO.builder()
                    .type(MessageType.ERROR)
                    .content(e.getMessage())
                    .sender("SERVER").build();
        }
    }
}
