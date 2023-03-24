package pl.srychert.PartyGamesPlatform.model.game;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.enums.NodeType;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class Node {
    @Builder.Default
    @NotBlank
    private String id = UUID.randomUUID().toString();
    @NotNull
    private NodeType type;
    @Builder.Default
    @NotNull
    private List<String> nextNodes = new ArrayList<>();
}
