package pl.srychert.PartyGamesPlatform.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import pl.srychert.PartyGamesPlatform.enums.MessageType;

@Setter
@Getter
@Builder
@AllArgsConstructor
public class TextMessageDTO {
    private MessageType type;
    private String sender;
    @Builder.Default
    private String content = "";
    @Builder.Default
    private String json = "{}";

    public TextMessageDTO() {
    }
}
