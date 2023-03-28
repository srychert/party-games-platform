package pl.srychert.PartyGamesPlatform.model.game.item.potion;

import lombok.Getter;
import lombok.Setter;
import pl.srychert.PartyGamesPlatform.enums.ItemEffect;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.AbstractMap;
import java.util.Optional;

@Getter
@Setter
public class HealPotion extends Item {
    private Integer healAmount = 4;

    public HealPotion() {
        Optional<Integer> providedCost = Optional.ofNullable(super.getCost());

        super.setCost(providedCost.orElse(2));
    }

    @Override
    public AbstractMap.SimpleImmutableEntry<ItemEffect, Integer> use() {
        return new AbstractMap.SimpleImmutableEntry<>(ItemEffect.HEAL, healAmount);
    }
}
