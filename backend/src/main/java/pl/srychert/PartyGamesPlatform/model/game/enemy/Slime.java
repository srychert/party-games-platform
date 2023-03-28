package pl.srychert.PartyGamesPlatform.model.game.enemy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Slime extends Enemy {

    @Override
    public List<Item> lootItems() {
        return this.getLoot().getItems();
    }

    @Override
    public Integer lootGold() {
        return this.getLoot().getGold();
    }
}
