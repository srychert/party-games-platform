package pl.srychert.PartyGamesPlatform.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketMeesageConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
        registry.addEndpoint("/game").setAllowedOrigins(BootConfiguration.host, "http://127.0.0.1:3000")
                .setHandshakeHandler(new CustomHandshakeHandler()).withSockJS();
        registry.addEndpoint("/quiz").setAllowedOrigins(BootConfiguration.host, "http://127.0.0.1:3000")
                .setHandshakeHandler(new CustomHandshakeHandler()).withSockJS();
    }

    @Override
    public void configureMessageBroker(final MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic");
    }
}
