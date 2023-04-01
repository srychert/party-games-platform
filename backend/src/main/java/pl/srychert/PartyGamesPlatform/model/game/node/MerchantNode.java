package pl.srychert.PartyGamesPlatform.model.game.node;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pl.srychert.PartyGamesPlatform.exception.item.ItemNotPresentException;
import pl.srychert.PartyGamesPlatform.exception.item.ItemTooExpensiveException;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
public class MerchantNode extends Node {
    @Builder.Default
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Map<String, Item> items = new HashMap<>();

    // only used when posting a new Game
    @NotNull
    @Builder.Default
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Item> itemsList = new ArrayList<>();

    @NodeOptionMethod
    public Player buyItem(Player player, @VisibleParam String itemId) throws Exception {
        Item item = items.get(itemId);

        if (item == null) {
            throw new ItemNotPresentException(String.format("Item of id %s not present", itemId));
        }

        if (item.getCost() > player.getGold()) {
            throw new ItemTooExpensiveException("Item too expensive");
        }

        player.setGold(player.getGold() - item.getCost());
        player.addItem(item);

        player.setCurrentRoundCompleted(true);

        return player;
    }

    public MerchantNode() {

    }
}
