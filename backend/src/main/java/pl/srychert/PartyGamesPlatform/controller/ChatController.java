package pl.srychert.PartyGamesPlatform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import pl.srychert.PartyGamesPlatform.model.ChatMessage;
import pl.srychert.PartyGamesPlatform.service.GameStateService;

@Controller
public class ChatController {
    @Autowired
    GameStateService gameStateService;

    @MessageMapping("/{gamePin}")
    @SendTo("/topic/public/{gamePin}")
    public ChatMessage sendMessage(@Payload final ChatMessage chatMessage){
        return chatMessage;
    }

    @MessageMapping("/{gamePin}.newUser")
    @SendTo("/topic/public/{gamePin}")
    public ChatMessage newUser(@Payload final ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("username" ,chatMessage.getSender());
        return chatMessage;
    }

    @MessageMapping("/{gamePin}.startGame")
    @SendTo("/topic/public/{gamePin}")
    public ChatMessage startGame(@DestinationVariable String gamePin, @Payload final ChatMessage chatMessage) {
        gameStateService.startGame(gamePin);
        // TODO
        // forbid connecting to topic
        return chatMessage;
    }
}
