package pl.srychert.PartyGamesPlatform.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import pl.srychert.PartyGamesPlatform.service.game.GameStateService;
import pl.srychert.PartyGamesPlatform.service.quiz.QuizStateService;

@Slf4j
@Component
public class WebSocketEventListener {
    @Autowired
    SimpMessageSendingOperations sendingOperations;

    @Autowired
    QuizStateService quizStateService;

    @Autowired
    GameStateService gameStateService;

    @EventListener
    public void handleWebSocketConnectListener(final SessionConnectedEvent event) {
        log.info("New connection!");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(final SessionDisconnectEvent event) {
        if (event.getUser() != null) {
            String hostId = event.getUser().getName();
            quizStateService.freePin(hostId);
            gameStateService.freePin(hostId);
        }
        log.info("Disconnect!");
//        final StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//
//        final String username = (String) headerAccessor.getSessionAttributes().get("username");
//
//        final ChatMessage chatMessage = ChatMessage.builder()
//                .type(MessageType.DISCONNECT)
//                .sender(username)
//                .build();
//
//        sendingOperations.convertAndSend("/topic/public", chatMessage);
    }
}
