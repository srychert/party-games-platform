package pl.srychert.PartyGamesPlatform.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import pl.srychert.PartyGamesPlatform.model.TextMessageDTO;
import pl.srychert.PartyGamesPlatform.service.quiz.QuizRoomHostService;
import pl.srychert.PartyGamesPlatform.service.quiz.QuizRoomService;

import java.security.Principal;

@Slf4j
@Controller
public class QuizMessageController {
    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    QuizRoomService quizRoomService;

    @Autowired
    QuizRoomHostService quizRoomHostService;

    @MessageMapping("/quizroom/{pin}")
    public TextMessageDTO quizRoom(Principal principal,
                                   @DestinationVariable String pin,
                                   @Payload final TextMessageDTO textMessageDTO) {

        TextMessageDTO answer = quizRoomService.handleMessage(principal.getName(), textMessageDTO, pin);

        template.convertAndSendToUser(principal.getName(), "/topic/reply", answer);
        template.convertAndSend(String.format("/topic/quizroom/%s/host", pin), answer);

        return null;
    }

    @MessageMapping("/quizroom/{pin}/host")
    public TextMessageDTO quizRoomHost(Principal principal,
                                       @DestinationVariable String pin,
                                       @Payload final TextMessageDTO textMessageDTO) {

        TextMessageDTO answer = quizRoomHostService.handleMessage(principal.getName(), textMessageDTO, pin);

        template.convertAndSend(String.format("/topic/quizroom/%s", pin), answer);
        return answer;
    }

    @MessageMapping("/create/quizroom")
    @SendToUser("/topic/reply")
    public TextMessageDTO createQuizRoom(Principal principal, @Payload final TextMessageDTO textMessageDTO) {

        return quizRoomHostService.handleMessage(principal.getName(), textMessageDTO, null);
    }
}
