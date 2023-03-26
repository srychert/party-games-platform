package pl.srychert.PartyGamesPlatform.service.game;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.enums.MessageReceiver;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.model.game.GameState;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class GameRoomHostService {
    @Autowired
    GameStateService gameStateService;


    public Map<MessageReceiver, TextMessageDTO> handleMessage(String id, TextMessageDTO textMessageDTO, String pin) {
        return switch (textMessageDTO.getType()) {
            case CREATE_ROOM -> handleCreateRoom(id, textMessageDTO);
            case START_GAME -> handleStartGame(id, textMessageDTO, pin);
            case NEXT_ROUND -> handleNextRound(id, textMessageDTO, pin);
            default -> new HashMap<>();
        };
    }

    private Map<MessageReceiver, TextMessageDTO> handleCreateRoom(String id, TextMessageDTO textMessageDTO) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();
        Optional<String> pinOpt = gameStateService.getUnusedPin();

        if (pinOpt.isEmpty()) {
            messages.put(MessageReceiver.HOST, TextMessageDTO.builder()
                    .type(MessageType.NO_PIN)
                    .sender("SERVER").build());
            return messages;
        }

        String pin = pinOpt.get();

        Optional<GameState> game = gameStateService.createGameState(pin, id, textMessageDTO.getContent());

        if (game.isEmpty()) {
            messages.put(MessageReceiver.HOST, TextMessageDTO.builder()
                    .type(MessageType.NO_GAME)
                    .sender("SERVER").build());
            return messages;
        }

        TextMessageDTO createdMsg = TextMessageDTO.builder()
                .type(MessageType.CREATED)
                .content(pin)
                .sender("SERVER").build();

        messages.put(MessageReceiver.HOST, createdMsg);

        return messages;
    }

    private Map<MessageReceiver, TextMessageDTO> handleStartGame(String id, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();

        boolean started = gameStateService.startGame(pin);

        if (!started) {
            messages.put(MessageReceiver.HOST, TextMessageDTO.builder()
                    .type(MessageType.NO_ROOM)
                    .sender("SERVER").build());
            return messages;
        }

        // TODO add first round data
        JSONObject jsonObject = new JSONObject();

        TextMessageDTO startedMsg = TextMessageDTO.builder()
                .type(MessageType.STARTED)
                .json(jsonObject.toString())
                .sender("SERVER").build();

        messages.put(MessageReceiver.HOST, startedMsg);
        messages.put(MessageReceiver.ROOM, startedMsg);

        return messages;
    }

    private Map<MessageReceiver, TextMessageDTO> handleNextRound(String id, TextMessageDTO textMessageDTO, String pin) {
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
