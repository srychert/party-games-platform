package pl.srychert.PartyGamesPlatform.model.game.item.potion;

import com.fasterxml.jackson.annotation.JsonIgnore;
import pl.srychert.PartyGamesPlatform.enums.ItemEffect;
import pl.srychert.PartyGamesPlatform.enums.ItemType;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class YellowBuffPotion extends Item {
    public YellowBuffPotion() {
        Optional<Integer> providedCost = Optional.ofNullable(super.getCost());
        Optional<Map<ItemEffect, Integer>> providedItemEffectMap = Optional.ofNullable(super.getItemEffectMap());

        super.setCost(providedCost.orElse(10));
        super.setItemEffectMap(providedItemEffectMap.orElse(getDefaultMap()));
        setPath("items/potion/yellow-buff-potion.png");
        setType(ItemType.YELLOW_BUFF_POTION);
    }

    @JsonIgnore
    public Map<ItemEffect, Integer> getDefaultMap() {
        HashMap<ItemEffect, Integer> effects = new HashMap<>();

        effects.put(ItemEffect.SPEED_BUFF, 2);

        return effects;
    }
}
