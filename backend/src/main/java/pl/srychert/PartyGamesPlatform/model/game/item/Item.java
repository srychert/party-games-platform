package pl.srychert.PartyGamesPlatform.model.game.item;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.enums.ItemEffect;
import pl.srychert.PartyGamesPlatform.enums.ItemType;
import pl.srychert.PartyGamesPlatform.model.game.item.potion.*;

import java.util.Map;
import java.util.UUID;

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = HealPotion.class, name = "HEAL_POTION"),
        @JsonSubTypes.Type(value = RedBuffPotion.class, name = "RED_BUFF_POTION"),
        @JsonSubTypes.Type(value = BlueBuffPotion.class, name = "BLUE_BUFF_POTION"),
        @JsonSubTypes.Type(value = YellowBuffPotion.class, name = "YELLOW_BUFF_POTION"),
        @JsonSubTypes.Type(value = VioletBuffPotion.class, name = "VIOLET_BUFF_POTION"),
        @JsonSubTypes.Type(value = OrangeBuffPotion.class, name = "ORANGE_BUFF_POTION"),
        @JsonSubTypes.Type(value = GreenBuffPotion.class, name = "GREEN_BUFF_POTION"),
        @JsonSubTypes.Type(value = WhiteBuffPotion.class, name = "WHITE_BUFF_POTION"),
        @JsonSubTypes.Type(value = CursedSword.class, name = "CURSED_SWORD"),
        @JsonSubTypes.Type(value = BindingChain.class, name = "BINDING_CHAIN"),
        @JsonSubTypes.Type(value = DustOfSlowness.class, name = "DUST_OF_SLOWNESS"),
        @JsonSubTypes.Type(value = ScrollOfWeakening.class, name = "SCROLL_OF_WEAKENING"),
        @JsonSubTypes.Type(value = PiercingArrow.class, name = "PIERCING_ARROW"),
        @JsonSubTypes.Type(value = ToxicCauldron.class, name = "TOXIC_CAULDRON"),
        @JsonSubTypes.Type(value = DeadlyCloud.class, name = "DEADLY_CLOUD"),
})
public abstract class Item implements Usable<Integer> {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String id = UUID.randomUUID().toString();
    @NotNull
    private ItemType type;
    @Min(0)
    private Integer cost;
    private Map<ItemEffect, Integer> itemEffectMap;
    @NotNull
    private String path;

    public Map<ItemEffect, Integer> use() {
        return getItemEffectMap();
    }

    public Item() {
    }
}
