package pl.srychert.PartyGamesPlatform.service.game;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.enums.MessageReceiver;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.model.game.Player;

import java.util.HashMap;
import java.util.Map;

@Service
public class GameRoomService {

    public Map<MessageReceiver, TextMessageDTO> handleMessage(String name, TextMessageDTO textMessageDTO, String pin) {
        return switch (textMessageDTO.getType()) {
            case JOIN -> handleJoin(name, textMessageDTO, pin);
            case PLAY -> handlePlay(name, textMessageDTO, pin);
            default -> null;
        };
    }

    private Map<MessageReceiver, TextMessageDTO> handleJoin(String name, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();

        Player player = Player.builder()
                .id(name)
                .nick(textMessageDTO.getSender())
                .build();

        JSONObject playerJson = new JSONObject(player);

        TextMessageDTO joined = TextMessageDTO.builder()
                .type(MessageType.JOINED)
                .content(player.getId())
                .json(playerJson.toString())
                .sender(player.getNick()).build();

        messages.put(MessageReceiver.HOST, joined);
        messages.put(MessageReceiver.PLAYER, joined);

        return messages;
    }

    private Map<MessageReceiver, TextMessageDTO> handlePlay(String name, TextMessageDTO textMessageDTO, String pin) {
        return null;
    }
}
