package pl.srychert.PartyGamesPlatform.service.game;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.enums.MessageReceiver;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;

import java.util.HashMap;
import java.util.Map;

@Service
public class GameRoomHostService {

    public Map<MessageReceiver, TextMessageDTO> handleMessage(String name, TextMessageDTO textMessageDTO, String pin) {
        return switch (textMessageDTO.getType()) {
            case CREATE_ROOM -> handleCreateRoom(name, textMessageDTO);
            case START_GAME -> handleStartGame(name, textMessageDTO, pin);
            case NEXT_ROUND -> handleNextRound(name, textMessageDTO, pin);
            default -> null;
        };
    }

    private Map<MessageReceiver, TextMessageDTO> handleCreateRoom(String name, TextMessageDTO textMessageDTO) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();
        // TODO get pin
        String pin = null;


        if (pin == null) {
            messages.put(MessageReceiver.PLAYER, TextMessageDTO.builder()
                    .type(MessageType.NO_PIN)
                    .sender("SERVER").build());
            return messages;
        }

        TextMessageDTO createdMsg = TextMessageDTO.builder()
                .type(MessageType.CREATED)
                .content(pin)
                .sender("SERVER").build();

        messages.put(MessageReceiver.PLAYER, createdMsg);

        return messages;
    }

    private Map<MessageReceiver, TextMessageDTO> handleStartGame(String name, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();

        // TODO logic for game start
        JSONObject jsonObject = new JSONObject();

        TextMessageDTO startedMsg = TextMessageDTO.builder()
                .type(MessageType.STARTED)
                .json(jsonObject.toString())
                .content("")
                .sender("SERVER").build();

        messages.put(MessageReceiver.HOST, startedMsg);
        messages.put(MessageReceiver.ROOM, startedMsg);

        return messages;
    }

    private Map<MessageReceiver, TextMessageDTO> handleNextRound(String name, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();

        // TODO next round logic and game ending
        JSONObject jsonObject = new JSONObject();

        TextMessageDTO nextRoundMsg = TextMessageDTO.builder()
                .type(MessageType.NEXT_ROUND)
                .json(jsonObject.toString())
                .sender("SERVER").build();

        TextMessageDTO gameEndedMsg = TextMessageDTO.builder()
                .type(MessageType.ENDED)
                .json(jsonObject.toString())
                .sender("SERVER").build();


        messages.put(MessageReceiver.HOST, nextRoundMsg);

        return messages;
    }
}
