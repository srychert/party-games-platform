package pl.srychert.PartyGamesPlatform.model.game;

import lombok.AllArgsConstructor;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class Loot {
    private Integer gold = 0;
    private List<Item> items = new ArrayList<>();

    public Loot() {
    }
}
