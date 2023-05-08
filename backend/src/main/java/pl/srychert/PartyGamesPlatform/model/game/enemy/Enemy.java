package pl.srychert.PartyGamesPlatform.model.game.enemy;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import pl.srychert.PartyGamesPlatform.enums.EnemyType;
import pl.srychert.PartyGamesPlatform.enums.Stance;
import pl.srychert.PartyGamesPlatform.model.game.Loot;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;
import pl.srychert.PartyGamesPlatform.validation.SumChance;

import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Slime.class, name = "SLIME"),
})
public abstract class Enemy implements Lootable {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String id = UUID.randomUUID().toString();
    @NotNull
    private EnemyType type;

    @Positive
    private Integer hp;
    @Positive
    private Integer atk;
    @Positive
    private Integer speed;
    @Size(min = 1)
    @SumChance
    private List<@Valid StanceWithChance> stances;
    private @Valid Loot loot;

    public Enemy() {

    }

    public List<Item> lootItems() {
        return this.getLoot().getItems();
    }

    public Integer lootGold() {
        return this.getLoot().getGold();
    }

    public Stance getStance() {
        return stances.get(0).getStance();
    }
}
