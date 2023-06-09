package pl.srychert.PartyGamesPlatform.model.game.item;

import com.fasterxml.jackson.annotation.JsonIgnore;
import pl.srychert.PartyGamesPlatform.enums.ItemEffect;
import pl.srychert.PartyGamesPlatform.enums.ItemType;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class PiercingArrow extends Item {
    public PiercingArrow() {
        Optional<Integer> providedCost = Optional.ofNullable(super.getCost());
        Optional<Map<ItemEffect, Integer>> providedItemEffectMap = Optional.ofNullable(super.getItemEffectMap());

        super.setCost(providedCost.orElse(15));
        super.setItemEffectMap(providedItemEffectMap.orElse(getDefaultMap()));
        setPath("items/piercing-arrow.png");
        setType(ItemType.PIERCING_ARROW);
    }

    @JsonIgnore
    public Map<ItemEffect, Integer> getDefaultMap() {
        HashMap<ItemEffect, Integer> effects = new HashMap<>();

        effects.put(ItemEffect.HP_DEBUFF, 4);
        effects.put(ItemEffect.SPEED_DEBUFF, 4);

        return effects;
    }
}
