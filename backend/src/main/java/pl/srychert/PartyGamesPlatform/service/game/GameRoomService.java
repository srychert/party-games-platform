package pl.srychert.PartyGamesPlatform.service.game;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.enums.MessageReceiver;
import pl.srychert.PartyGamesPlatform.enums.MessageType;
import pl.srychert.PartyGamesPlatform.exception.NodeOptionProcessingException;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.model.game.node.Node;
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
            case NODE_OPTION -> handleNodeOption(id, textMessageDTO, pin);
            case CHOOSE_NODE -> handleChooseNode(id, textMessageDTO, pin);
            default -> new HashMap<>();
        };
    }

    private Map<MessageReceiver, TextMessageDTO> handleJoin(String id, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();

        Optional<Player> playerOptional = gameStateService.joinPlayer(pin, id, textMessageDTO.getSender());

        if (playerOptional.isEmpty()) {
            addErrorMessageForPlayer(messages, "Join failed");
            return messages;
        }

        Player player = playerOptional.get();
        Optional<Node> nodeOptional = gameStateService.getCurrentNode(pin, player);

        if (nodeOptional.isEmpty()) {
            addErrorMessageForPlayer(messages, "Join failed - empty current Node");
            return messages;
        }

        TextMessageDTO joined = TextMessageDTO.builder()
                .type(MessageType.JOINED)
                .content(player.getId())
                .json(new JSONObject()
                        .put("player", new JSONObject(player))
                        .put("node", new JSONObject(nodeOptional.get()))
                        .toString())
                .sender(player.getNick()).build();

        messages.put(MessageReceiver.HOST, joined);
        messages.put(MessageReceiver.PLAYER, joined);

        return messages;
    }

    private Map<MessageReceiver, TextMessageDTO> handleNodeOption(String id, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();

        if (!gameStateService.isGameOngoing(pin)) {
            addErrorMessageForPlayer(messages, "Game is not ongoing");
            return messages;
        }

        Optional<Player> playerOpt = gameStateService.getPlayer(pin, id);

        if (playerOpt.isEmpty()) {
            addErrorMessageForPlayer(messages, String.format("No player with id %s", id));
            return messages;
        }

        if (playerOpt.get().getCurrentRoundCompleted()) {
            addErrorMessageForPlayer(messages, "Current round already completed");
            return messages;
        }

        if (playerOpt.get().getCanChooseNode()) {
            addErrorMessageForPlayer(messages, "Choose your next node now");
            return messages;
        }

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            NodeOption nodeOption = objectMapper.readValue(textMessageDTO.getJson(), NodeOption.class);

            JSONObject answer = gameStateService.callNodeMethod(pin, id, nodeOption);

            messages.put(MessageReceiver.PLAYER,
                    TextMessageDTO.builder()
                            .type(MessageType.ANSWER)
                            .json(answer.toString())
                            .sender("SERVER").build());

            messages.put(MessageReceiver.HOST,
                    TextMessageDTO.builder()
                            .type(MessageType.ANSWER)
                            .json(answer.toString())
                            .content(id)
                            .sender("SERVER").build());

        } catch (JsonProcessingException exception) {
            log.error(exception.getMessage());

            addErrorMessageForPlayer(messages, "Bad json");
        } catch (NodeOptionProcessingException exception) {
            log.error(exception.getMessage());

            addErrorMessageForPlayer(messages, exception.getMessage());
        } catch (InvocationTargetException exception) {
            String errorMessage = exception.getTargetException().getMessage();
            log.error(errorMessage);

            addErrorMessageForPlayer(messages, errorMessage);
        } catch (Exception exception) {
            log.error(exception.getMessage());

            addErrorMessageForPlayer(messages);
        }

        return messages;
    }

    private void addErrorMessageForPlayer(Map<MessageReceiver, TextMessageDTO> messages, String content) {
        messages.put(MessageReceiver.PLAYER,
                TextMessageDTO.builder()
                        .type(MessageType.ERROR)
                        .content(content)
                        .sender("SERVER").build());
    }

    private void addErrorMessageForPlayer(Map<MessageReceiver, TextMessageDTO> messages) {
        messages.put(MessageReceiver.PLAYER,
                TextMessageDTO.builder()
                        .type(MessageType.ERROR)
                        .sender("SERVER").build());
    }

    private Map<MessageReceiver, TextMessageDTO> handleChooseNode(String id, TextMessageDTO textMessageDTO, String pin) {
        Map<MessageReceiver, TextMessageDTO> messages = new HashMap<>();
        Optional<Player> playerOpt = gameStateService.getPlayer(pin, id);

        if (playerOpt.isEmpty()) {
            addErrorMessageForPlayer(messages, String.format("No player with id %s", id));
            return messages;
        }

        if (!playerOpt.get().getCanChooseNode()) {
            addErrorMessageForPlayer(messages, "Can't choose next node right now");
            return messages;
        }

        try {
            JSONObject answer = gameStateService.handleChooseNode(playerOpt.get(), textMessageDTO.getContent(), pin);

            messages.put(MessageReceiver.PLAYER,
                    TextMessageDTO.builder()
                            .type(MessageType.ANSWER)
                            .json(answer.toString())
                            .sender("SERVER").build());

        } catch (Exception exception) {
            log.error(exception.getMessage());

            addErrorMessageForPlayer(messages, exception.getMessage());
        }


        return messages;
    }
}
