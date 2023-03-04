package pl.srychert.PartyGamesPlatform.service.quiz;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.OngoingQuizMockDB;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.QuizPlayer;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizRoomService {
    public TextMessageDTO handleMessage(String name, TextMessageDTO textMessageDTO, String pin) {
        return switch (textMessageDTO.getType()) {
            case JOIN -> handleJoin(name, textMessageDTO, pin);
            case START_GAME -> handleStartGame(pin);
            default -> null;
        };
    }

    private TextMessageDTO handleJoin(String name, TextMessageDTO textMessageDTO, String pin) {
        List<QuizPlayer> players = OngoingQuizMockDB.quizes.getOrDefault(pin, new ArrayList<>());

        QuizPlayer player = QuizPlayer.builder()
                .id(name)
                .nick(textMessageDTO.getSender())
                .points(0)
                .build();

        if (players.stream().anyMatch(p -> p.getNick().equals(player.getNick()))) {
            return TextMessageDTO.builder()
                    .type(MessageType.DUPLICATE_NICK)
                    .sender("server").build();
        }

        players.add(player);
        OngoingQuizMockDB.quizes.put(pin, players);

        return TextMessageDTO.builder()
                .type(MessageType.JOINED)
                .content(player.getId())
                .sender(player.getNick()).build();
    }

    private TextMessageDTO handleStartGame(String pin) {
        List<QuizPlayer> players = OngoingQuizMockDB.quizes.getOrDefault(pin, new ArrayList<>());

        JSONObject playersJson = new JSONObject().put("players", players);

        return TextMessageDTO.builder()
                .type(MessageType.STARTED)
                .json(playersJson.toString())
                .content("")
                .sender("SERVER").build();
    }
}
