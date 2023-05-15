package pl.srychert.PartyGamesPlatform.model.game.node;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CustomParameter {
    private String name;
    private String typeName;
    private Object value;

    public CustomParameter() {
    }
}
