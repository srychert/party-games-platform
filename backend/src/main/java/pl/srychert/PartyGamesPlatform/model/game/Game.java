package pl.srychert.PartyGamesPlatform.model.game;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.validation.annotation.Validated;
import pl.srychert.PartyGamesPlatform.model.game.node.Node;

import java.util.Map;

@Validated
@Data
@Document
@Builder
@AllArgsConstructor
public class Game {
    @Setter(AccessLevel.NONE)
    @Id
    private String id;
    @NotBlank
    private String title;
    @NotNull
    private String description;
    @Builder.Default
    private Long totalTimesPlayed = 0L;
    @NotBlank
    private String createdBy;
    @NotNull
    @Size(min = 1)
    private Map<Integer, @Valid Node> nodes;

    public Game() {
    }
}
