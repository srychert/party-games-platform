package pl.srychert.PartyGamesPlatform.model;

import lombok.Builder;
import lombok.Getter;
import pl.srychert.PartyGamesPlatform.enums.MessageType;

@Builder
public class ChatMessage {
    @Getter
    private MessageType type;

    @Getter
    private String content;

    @Getter
    private String sender;

    @Getter
    private String time;
}
