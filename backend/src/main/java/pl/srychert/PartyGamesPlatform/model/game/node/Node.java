package pl.srychert.PartyGamesPlatform.model.game.node;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.UniqueElements;
import pl.srychert.PartyGamesPlatform.enums.NodeType;

import java.util.HashSet;
import java.util.Set;

@Data
@SuperBuilder
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true)
@JsonSubTypes({
        @Type(value = SkipNode.class, name = "SKIP"),
        @Type(value = FightNode.class, name = "FIGHT"),
        @Type(value = HealNode.class, name = "HEAL"),
        @Type(value = MerchantNode.class, name = "MERCHANT"),
})
public abstract class Node {
    private Integer id;
    @NotNull
    private NodeType type;
    @Builder.Default
    @UniqueElements
    private Set<Integer> nextNodesID = new HashSet<>();

    public Node() {

    }
}
