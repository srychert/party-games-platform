package pl.srychert.PartyGamesPlatform.model.game.enemy;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.enums.Stance;

@Builder
@Data
@AllArgsConstructor
public class StanceWithChance {
    @NotNull
    private Stance stance;
    @Positive
    private Integer chance;

    public StanceWithChance() {
    }
}
