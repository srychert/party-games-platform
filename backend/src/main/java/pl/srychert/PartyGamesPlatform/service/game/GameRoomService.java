package pl.srychert.PartyGamesPlatform.service.game;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.enums.MessageReceiver;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.model.game.node.NodeOption;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class GameRoomService {

    @Autowired
    GameStateService gameStateService;

    public Map<MessageReceiver, TextMessageDTO> handleMessage(String id, TextMessageDTO textMessageDTO, String pin) {
        return switch (textMessageDTO.getType()) {
            case JOIN -> handleJoin(id, textMessageDTO, pin);
            case PLAY -> handlePlay(id, textMessageDTO, pin);
            case NODE_OPTION -> handleNodeOption(id, textMessageDTO, pin);
            case NEXT_NODE -> handleNextNode(id, textMessageDTO, pin);
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

    private Map<MessageReceiver, TextMessageDTO> handleNodeOption(String id, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();
        Optional<Player> playerOpt = gameStateService.getPlayer(pin, id);

        if (!gameStateService.isGameOngoing(pin)) {
            return messages;
        }

        if (playerOpt.isEmpty()) {
            messages.put(MessageReceiver.PLAYER,
                    TextMessageDTO.builder()
                            .type(MessageType.ERROR)
                            .content(String.format("No player with id %s", id))
                            .sender("SERVER").build());
            return messages;
        }

        // Message not needed
        if (playerOpt.get().getCurrentRoundCompleted()) {
            return messages;
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            NodeOption nodeOption = objectMapper.readValue(textMessageDTO.getJson(), NodeOption.class);

            Player player = gameStateService.callNodeMethod(pin, id, nodeOption).orElseThrow(() -> new Exception("no player"));

            messages.put(MessageReceiver.PLAYER,
                    TextMessageDTO.builder()
                            .type(MessageType.ANSWER)
                            .json(new JSONObject(player).toString())
                            .sender("SERVER").build());

        } catch (JsonProcessingException exception) {
            log.error(exception.getMessage());

            messages.put(MessageReceiver.PLAYER,
                    TextMessageDTO.builder()
                            .type(MessageType.ERROR)
                            .content("Bad json")
                            .sender("SERVER").build());
        } catch (InvocationTargetException exception) {
            String errorMessage = exception.getTargetException().getMessage();
            log.error(errorMessage);

            messages.put(MessageReceiver.PLAYER,
                    TextMessageDTO.builder()
                            .type(MessageType.ERROR)
                            .content(errorMessage)
                            .sender("SERVER").build());
        } catch (Exception exception) {
            log.error(exception.getMessage());

            messages.put(MessageReceiver.PLAYER,
                    TextMessageDTO.builder()
                            .type(MessageType.ERROR)
                            .sender("SERVER").build());
        }

        return messages;
    }

    // TODO
    private Map<MessageReceiver, TextMessageDTO> handleNextNode(String id, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();
        Optional<Player> playerOpt = gameStateService.getPlayer(pin, id);


        return messages;
    }
}
