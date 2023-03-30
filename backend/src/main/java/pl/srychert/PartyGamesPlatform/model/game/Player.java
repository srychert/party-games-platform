package pl.srychert.PartyGamesPlatform.model.game;

import lombok.Builder;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;
import pl.srychert.PartyGamesPlatform.model.game.node.NodeOption;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class Player {
    private String id;
    private String nick;
    @Builder.Default
    private Integer gold = 0;
    @Builder.Default
    private Integer atk = 2;
    @Builder.Default
    private Integer speed = 2;
    @Builder.Default
    private Integer hp = 20;
    @Builder.Default
    private Map<String, Item> items = new HashMap<>();

    @Builder.Default
    private Boolean currentRoundCompleted = false;
    @Builder.Default
    private Integer currentNode = 0;
    @Builder.Default
    private List<NodeOption> options = new ArrayList<>();
    @Builder.Default
    private Map<Integer, List<NodeOption>> history = new HashMap<>();

    public void addItem(Item item) {
        items.put(item.getId(), item);
    }

    public void removeItem(String itemId) {
        items.remove(itemId);
    }

}
