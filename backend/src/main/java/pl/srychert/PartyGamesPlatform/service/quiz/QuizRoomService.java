package pl.srychert.PartyGamesPlatform.service.quiz;

import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.OngoingQuizMockDB;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.QuizPlayer;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class QuizRoomService {
    public TextMessageDTO handleMessage(TextMessageDTO textMessageDTO, String pin) {
        switch (textMessageDTO.getType()) {
            case JOIN:
                return handleJoin(textMessageDTO, pin);
            default:
                return null;
        }
    }

    private TextMessageDTO handleJoin(TextMessageDTO textMessageDTO, String pin) {
        List<QuizPlayer> players = OngoingQuizMockDB.quizes.getOrDefault(pin, new ArrayList<>());

        QuizPlayer player = QuizPlayer.builder()
                .id(UUID.randomUUID().toString())
                .nick(textMessageDTO.getSender())
                .build();

        if (players.stream().anyMatch(p -> p.getNick().equals(player.getNick()))) {
            return TextMessageDTO.builder()
                    .type(MessageType.DUPLICATE_NICK)
                    .sender("server").build();
        }

        players.add(player);

        OngoingQuizMockDB.quizes.put(pin, players);

        System.out.println(players.size());
        System.out.println(Arrays.toString(OngoingQuizMockDB.quizes.get(pin).toArray()));

        return TextMessageDTO.builder()
                .type(MessageType.JOINED)
                .content(player.getId())
                .sender("server").build();
    }
}
