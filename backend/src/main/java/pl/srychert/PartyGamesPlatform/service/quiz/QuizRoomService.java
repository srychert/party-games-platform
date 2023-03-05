package pl.srychert.PartyGamesPlatform.service.quiz;

import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.OngoingQuizMockDB;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.model.quiz.QuizPlayer;
import pl.srychert.PartyGamesPlatform.model.quiz.QuizState;

import java.util.List;

@Service
public class QuizRoomService {
    public TextMessageDTO handleMessage(String name, TextMessageDTO textMessageDTO, String pin) {
        return switch (textMessageDTO.getType()) {
            case JOIN -> handleJoin(name, textMessageDTO, pin);
            default -> null;
        };
    }

    private TextMessageDTO handleJoin(String name, TextMessageDTO textMessageDTO, String pin) {
        QuizState quiz = OngoingQuizMockDB.quizes.get(pin);

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
                .build();

        if (players.stream().anyMatch(p -> p.getNick().equals(player.getNick()))) {
            return TextMessageDTO.builder()
                    .type(MessageType.DUPLICATE_NICK)
                    .sender("SERVER").build();
        }

        players.add(player);
        quiz.setPlayers(players);
        OngoingQuizMockDB.quizes.put(pin, quiz);

        return TextMessageDTO.builder()
                .type(MessageType.JOINED)
                .content(player.getId())
                .sender(player.getNick()).build();
    }
}
