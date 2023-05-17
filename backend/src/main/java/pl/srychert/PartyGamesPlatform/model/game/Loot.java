package pl.srychert.PartyGamesPlatform.model.game;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class Loot {
    @Builder.Default
    @Min(0)
    private Integer gold = 0;
    @Builder.Default
    private List<@Valid Item> items = new ArrayList<>();

    public Loot() {
    }
}
