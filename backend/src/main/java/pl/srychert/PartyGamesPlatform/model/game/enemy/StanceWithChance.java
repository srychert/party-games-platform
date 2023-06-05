package pl.srychert.PartyGamesPlatform.model.game.enemy;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
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
    @Min(0)
    @Max(100)
    private Integer chance;

    public StanceWithChance() {
    }
}
