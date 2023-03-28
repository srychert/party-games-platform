package pl.srychert.PartyGamesPlatform.model.game;

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
    private Integer gold = 0;
    @Builder.Default
    private List<Item> items = new ArrayList<>();

    public Loot() {
    }
}
