package pl.srychert.PartyGamesPlatform.model.game.enemy;

import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.List;

public interface Lootable {
    List<Item> lootItems();

    Integer lootGold();
}
