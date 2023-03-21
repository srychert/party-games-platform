package pl.srychert.PartyGamesPlatform.service.quiz;

import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.OngoingQuizMockDB;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.model.quiz.Question;
import pl.srychert.PartyGamesPlatform.model.quiz.QuizPlayer;
import pl.srychert.PartyGamesPlatform.model.quiz.QuizState;

import java.util.List;
import java.util.Objects;
import java.util.OptionalInt;
import java.util.stream.IntStream;

@Service
public class QuizRoomService {
    public TextMessageDTO handleMessage(String name, TextMessageDTO textMessageDTO, String pin) {
        return switch (textMessageDTO.getType()) {
            case JOIN -> handleJoin(name, textMessageDTO, pin);
            case PLAY -> handlePlay(name, textMessageDTO, pin);
            default -> null;
        };
    }

    private TextMessageDTO handleJoin(String name, TextMessageDTO textMessageDTO, String pin) {
        QuizState quiz = OngoingQuizMockDB.quizzes.get(pin);

        if (quiz == null) {
            return TextMessageDTO.builder()
                    .type(MessageType.NO_ROOM)
                    .sender("SERVER").build();
        }

        List<QuizPlayer> players = quiz.getPlayers();

        QuizPlayer player = QuizPlayer.builder()
                .id(name)
                .nick(textMessageDTO.getSender())
                .points(0)
                .roundsPlayed(0)
                .build();

        if (players.stream().anyMatch(p -> p.getNick().equals(player.getNick()))) {
            return TextMessageDTO.builder()
                    .type(MessageType.DUPLICATE_NICK)
                    .sender("SERVER").build();
        }

        players.add(player);
        quiz.setPlayers(players);
        OngoingQuizMockDB.quizzes.put(pin, quiz);

        return TextMessageDTO.builder()
                .type(MessageType.JOINED)
                .content(player.getId())
                .sender(player.getNick()).build();
    }

    private TextMessageDTO handlePlay(String name, TextMessageDTO textMessageDTO, String pin) {
        QuizState quiz = OngoingQuizMockDB.quizzes.get(pin);
        Question question = quiz.getQuestions().get(quiz.getRound());

        boolean isCorrect = question.getCorrect().toString().equals(textMessageDTO.getContent());

        OptionalInt indexOpt = IntStream.range(0, quiz.getPlayers().size())
                .filter(i -> name.equals(quiz.getPlayers().get(i).getId()))
                .findFirst();

        if (indexOpt.isEmpty()) {
            return null;
        }

        QuizPlayer p = quiz.getPlayers().get(indexOpt.getAsInt());

        if (isCorrect && Objects.equals(p.getRoundsPlayed(), quiz.getRound())) {
            p.setPoints(p.getPoints() + 1);
        }

        p.setRoundsPlayed(quiz.getRound() + 1);

        return null;
    }
}
