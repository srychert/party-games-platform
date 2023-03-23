package pl.srychert.PartyGamesPlatform.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import pl.srychert.PartyGamesPlatform.enums.MessageReceiver;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.service.game.GameRoomHostService;
import pl.srychert.PartyGamesPlatform.service.game.GameRoomService;

import java.security.Principal;
import java.util.Map;

@Slf4j
@Controller
public class GameMessageController {
    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    GameRoomService gameRoomService;

    @Autowired
    GameRoomHostService gameRoomHostService;

    @MessageMapping("/game-room/{pin}")
    public TextMessageDTO gameRoom(Principal principal,
                                   @DestinationVariable String pin,
                                   @Payload final TextMessageDTO textMessageDTO) {


        Map<MessageReceiver, TextMessageDTO> messages = gameRoomService
                .handleMessage(principal.getName(), textMessageDTO, pin);

        template.convertAndSendToUser(principal.getName(), "/topic/reply", messages.get(MessageReceiver.PLAYER));
        template.convertAndSend(String.format("/topic/game-room/%s/host", pin), messages.get(MessageReceiver.HOST));

        return messages.get(MessageReceiver.ROOM);
    }

    @MessageMapping("/game-room/{pin}/host")
    public TextMessageDTO gameRoomHost(Principal principal,
                                       @DestinationVariable String pin,
                                       @Payload final TextMessageDTO textMessageDTO) {

        Map<MessageReceiver, TextMessageDTO> messages = gameRoomHostService
                .handleMessage(principal.getName(), textMessageDTO, pin);

        template.convertAndSendToUser(principal.getName(), "/topic/reply", messages.get(MessageReceiver.PLAYER));
        template.convertAndSend(String.format("/topic/game-room/%s", pin), messages.get(MessageReceiver.ROOM));
        return messages.get(MessageReceiver.HOST);
    }

    @MessageMapping("/create/game-room")
    @SendToUser("/topic/reply")
    public TextMessageDTO createGameRoom(Principal principal, @Payload final TextMessageDTO textMessageDTO) {

        Map<MessageReceiver, TextMessageDTO> messages = gameRoomHostService
                .handleMessage(principal.getName(), textMessageDTO, null);

        return messages.get(MessageReceiver.PLAYER);
    }
}
