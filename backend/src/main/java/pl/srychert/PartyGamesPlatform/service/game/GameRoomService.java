package pl.srychert.PartyGamesPlatform.service.game;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.enums.MessageReceiver;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.model.game.Player;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class GameRoomService {

    @Autowired
    GameStateService gameStateService;

    public Map<MessageReceiver, TextMessageDTO> handleMessage(String id, TextMessageDTO textMessageDTO, String pin) {
        return switch (textMessageDTO.getType()) {
            case JOIN -> handleJoin(id, textMessageDTO, pin);
            case PLAY -> handlePlay(id, textMessageDTO, pin);
            default -> new HashMap<>();
        };
    }

    private Map<MessageReceiver, TextMessageDTO> handleJoin(String id, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();

        Optional<Player> playerOptional = gameStateService.joinPlayer(pin, id, textMessageDTO.getSender());

        if (playerOptional.isEmpty()) {
            messages.put(MessageReceiver.PLAYER, TextMessageDTO.builder()
                    .type(MessageType.NO_ROOM)
                    .sender("SERVER").build());
            return messages;
        }

        Player player = playerOptional.get();

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

    private Map<MessageReceiver, TextMessageDTO> handlePlay(String id, TextMessageDTO textMessageDTO, String pin) {
        return null;
    }
}
