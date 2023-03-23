package pl.srychert.PartyGamesPlatform.model.game;

import lombok.Builder;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.enums.NodeType;

@Data
@Builder
public class Node {
    private String id;
    private NodeType type;
}
