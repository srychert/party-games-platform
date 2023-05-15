package pl.srychert.PartyGamesPlatform.model.game.item.potion;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class HealPotion extends Item {
    private Integer healAmount = 4;

    public HealPotion() {
        Optional<Integer> providedCost = Optional.ofNullable(super.getCost());
        Optional<Map<ItemEffect, ?>> providedItemEffectMap = Optional.ofNullable(super.getItemEffectMap());

        super.setCost(providedCost.orElse(2));
        super.setItemEffectMap(providedItemEffectMap.orElse(getDefaultMap()));
        setType(ItemType.HEAL_POTION);
    }

    @Override
    public Map<ItemEffect, ?> use() {
        return getItemEffectMap();
    }

    @JsonIgnore
    public Map<ItemEffect, Integer> getDefaultMap() {
        HashMap<ItemEffect, Integer> effects = new HashMap<>();

        effects.put(ItemEffect.HEAL, healAmount);

        return effects;
    }
}
