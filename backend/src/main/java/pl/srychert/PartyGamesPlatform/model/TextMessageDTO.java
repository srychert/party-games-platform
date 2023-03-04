package pl.srychert.PartyGamesPlatform.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import pl.srychert.PartyGamesPlatform.enums.MessageType;

@Setter
@Getter
@Builder
public class TextMessageDTO {
    private MessageType type;
    private String content;
    private String sender;
}
