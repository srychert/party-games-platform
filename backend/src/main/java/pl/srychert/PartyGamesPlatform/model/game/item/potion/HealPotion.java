package pl.srychert.PartyGamesPlatform.model.game.item.potion;

import lombok.AllArgsConstructor;
import pl.srychert.PartyGamesPlatform.enums.ItemEffect;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.AbstractMap;

@AllArgsConstructor
public class HealPotion extends Item {

    @Override
    public AbstractMap.SimpleImmutableEntry<ItemEffect, Integer> use() {
        return new AbstractMap.SimpleImmutableEntry<>(ItemEffect.HEAL, 4);
    }
}
