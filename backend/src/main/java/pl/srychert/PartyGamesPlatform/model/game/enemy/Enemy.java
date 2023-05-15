package pl.srychert.PartyGamesPlatform.model.game.enemy;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.enums.EnemyType;
import pl.srychert.PartyGamesPlatform.enums.Stance;
import pl.srychert.PartyGamesPlatform.model.game.GameEntity;
import pl.srychert.PartyGamesPlatform.model.game.Loot;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;
import pl.srychert.PartyGamesPlatform.validation.SumChance;

import java.util.ArrayList;
import java.util.List;
import java.util.OptionalInt;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.IntStream;

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Slime.class, name = "SLIME"),
})
public abstract class Enemy implements Lootable, GameEntity {
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
    private Stance stance;
    private @Valid Loot loot;

    public Enemy() {

    }

    public List<Item> lootItems() {
        return this.getLoot().getItems();
    }

    public Integer lootGold() {
        return this.getLoot().getGold();
    }

    public Stance drawStance() {
        List<Integer> chances = new ArrayList<>();

        for (int i = 0; i < stances.size(); i++) {
            var chance = stances.get(i).getChance();
            if (i == 0) {
                chances.add(chance);
                continue;
            }

            chances.add(chance + chances.get(i - 1));
        }

        int randomValue = ThreadLocalRandom.current().nextInt(1, 101);

        OptionalInt index = IntStream.range(0, chances.size())
                .filter(i -> randomValue <= chances.get(i))
                .findFirst();

        if (index.isEmpty()) {
            throw new RuntimeException("No stance");
        }

        stance = stances.get(index.getAsInt()).getStance();
        return stance;
    }
}
