package pl.srychert.PartyGamesPlatform.model.game.item;

import com.fasterxml.jackson.annotation.JsonIgnore;
import pl.srychert.PartyGamesPlatform.enums.ItemEffect;
import pl.srychert.PartyGamesPlatform.enums.ItemType;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class ToxicCauldron extends Item {
    public ToxicCauldron() {
        Optional<Integer> providedCost = Optional.ofNullable(super.getCost());
        Optional<Map<ItemEffect, Integer>> providedItemEffectMap = Optional.ofNullable(super.getItemEffectMap());

        super.setCost(providedCost.orElse(15));
        super.setItemEffectMap(providedItemEffectMap.orElse(getDefaultMap()));
        setPath("items/toxic-cauldron.png");
        setType(ItemType.TOXIC_CAULDRON);
    }

    @JsonIgnore
    public Map<ItemEffect, Integer> getDefaultMap() {
        HashMap<ItemEffect, Integer> effects = new HashMap<>();

        effects.put(ItemEffect.ATK_DEBUFF, 4);
        effects.put(ItemEffect.SPEED_DEBUFF, 4);

        return effects;
    }
}
