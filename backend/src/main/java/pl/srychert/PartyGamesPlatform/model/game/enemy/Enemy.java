package pl.srychert.PartyGamesPlatform.model.game.enemy;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.enums.EnemyType;
import pl.srychert.PartyGamesPlatform.model.game.Loot;

import java.util.UUID;

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

    private Integer atk = 2;
    private Integer speed = 2;
    private Integer hp = 20;
    private Loot loot;

    public Enemy() {

    }
}
