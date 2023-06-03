package pl.srychert.PartyGamesPlatform.model.game.item.potion;

import lombok.Getter;
import lombok.Setter;
import pl.srychert.PartyGamesPlatform.enums.ItemEffect;
import pl.srychert.PartyGamesPlatform.enums.ItemType;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Getter
@Setter
public class Potion extends Item {
    public Potion() {
        Optional<Integer> providedCost = Optional.ofNullable(super.getCost());
        Optional<Map<ItemEffect, Integer>> providedItemEffectMap = Optional.ofNullable(super.getItemEffectMap());

        super.setCost(providedCost.orElse(1));
        super.setItemEffectMap(providedItemEffectMap.orElse(new HashMap<>()));
        setType(ItemType.POTION);
    }
}
