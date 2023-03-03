package pl.srychert.PartyGamesPlatform.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;

@Slf4j
@Controller
public class QuizMessageController {
    @Autowired
    SimpMessagingTemplate template;

    @MessageMapping("/quizroom/{pin}")
    public TextMessageDTO quizRoom(@Header("simpSessionId") String sessionId,
                                   @DestinationVariable String pin, @Payload final TextMessageDTO textMessageDTO) {
        
        return textMessageDTO;
    }

    @MessageMapping("/quizroom/{pin}/host")
    public TextMessageDTO quizRoomHost(@DestinationVariable Integer pin, @Payload final TextMessageDTO textMessageDTO) {
        return textMessageDTO;
    }
}
