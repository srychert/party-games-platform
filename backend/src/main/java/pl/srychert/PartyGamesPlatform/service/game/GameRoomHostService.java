package pl.srychert.PartyGamesPlatform.service.game;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.enums.MessageReceiver;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.model.game.GameState;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.model.game.node.NodeOption;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class GameRoomHostService {
    @Autowired
    GameStateService gameStateService;


    public Map<MessageReceiver, TextMessageDTO> handleMessage(String id, TextMessageDTO textMessageDTO, String pin) {
        return switch (textMessageDTO.getType()) {
            case CREATE_ROOM -> handleCreateRoom(id, textMessageDTO);
            case START_GAME -> handleStartGame(id, textMessageDTO, pin);
            case NEXT_ROUND -> handleNextRound(id, textMessageDTO, pin);
            case END_GAME -> handleGameEnd(id, textMessageDTO, pin);
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

        Optional<GameState> gameStateOpt = gameStateService.startGame(pin);

        if (gameStateOpt.isEmpty()) {
            messages.put(MessageReceiver.HOST, TextMessageDTO.builder()
                    .type(MessageType.NO_ROOM)
                    .sender("SERVER").build());
            return messages;
        }

        GameState gameState = gameStateOpt.get();

        List<NodeOption> options = gameStateService.getNodeOptions(gameState.getGameId(), 0);

        TextMessageDTO startedMsg = TextMessageDTO.builder()
                .type(MessageType.STARTED)
                .sender("SERVER").build();

        TextMessageDTO startedMsgHost = TextMessageDTO.builder()
                .type(MessageType.STARTED)
                .json(new JSONObject()
                        .put("players", gameState.getPlayers())
                        .put("options", options)
                        .toString())
                .sender("SERVER").build();

        messages.put(MessageReceiver.ROOM, startedMsg);
        messages.put(MessageReceiver.HOST, startedMsgHost);

        return messages;
    }

    private Map<MessageReceiver, TextMessageDTO> handleNextRound(String id, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();

        JSONObject jsonObject = new JSONObject();

        try {
            Map<String, List<JSONObject>> playersOptions = gameStateService.handleNextRound(pin);

            if (gameStateService.getGameInfo(pin, null).isAllPlayersGameEnded()) {
                messages.put(MessageReceiver.ROOM,
                        TextMessageDTO.builder()
                                .type(MessageType.ENDED)
                                .json(new JSONObject().put("players", gameStateService.endGame(pin)).toString())
                                .sender("SERVER").build());
                return messages;
            }

            messages.put(MessageReceiver.ROOM,
                    TextMessageDTO.builder()
                            .type(MessageType.NEXT_ROUND)
                            .json(jsonObject.put("playersOptions", playersOptions).toString())
                            .sender("SERVER").build());

        } catch (Exception exception) {
            log.error(exception.getMessage());

            messages.put(MessageReceiver.HOST,
                    TextMessageDTO.builder()
                            .type(MessageType.ERROR)
                            .content(exception.getMessage())
                            .sender("SERVER").build());
        }

        return messages;
    }

    private Map<MessageReceiver, TextMessageDTO> handleGameEnd(String id, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();

        JSONObject jsonObject = new JSONObject();

        try {
            Map<String, Player> players = gameStateService.endGame(pin);

            TextMessageDTO gameEndMsg = TextMessageDTO.builder()
                    .type(MessageType.ENDED)
                    .json(new JSONObject().put("players", new JSONObject(players)).toString())
                    .sender("SERVER").build();

            messages.put(MessageReceiver.ROOM, gameEndMsg);

        } catch (Exception exception) {
            log.error(exception.getMessage());

            messages.put(MessageReceiver.HOST,
                    TextMessageDTO.builder()
                            .type(MessageType.ERROR)
                            .content(exception.getMessage())
                            .sender("SERVER").build());
        }

        return messages;
    }
}
