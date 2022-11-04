package pl.srychert.PartyGamesPlatform.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import pl.srychert.PartyGamesPlatform.model.ChatMessage;

@Controller
public class ChatController {
    @MessageMapping("/chat/{gamePin}.send")
    @SendTo("/topic/public/{gamePin}")
    public ChatMessage sendMessage(@Payload final ChatMessage chatMessage){
        return chatMessage;
    }

    @MessageMapping("/chat/{gamePin}.newUser")
    @SendTo("/topic/public/{gamePin}")
    public ChatMessage newUser(@DestinationVariable String gamePin, @Payload final ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("username" ,chatMessage.getSender());
        return chatMessage;
    }
}
