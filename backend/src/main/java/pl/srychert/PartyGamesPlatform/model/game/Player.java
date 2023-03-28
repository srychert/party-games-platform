package pl.srychert.PartyGamesPlatform.model.game;

import lombok.Builder;
import lombok.Data;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;

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
    private Boolean currentRoundCompleted = false;
    @Builder.Default
    private Integer gold = 0;
    @Builder.Default
    private Integer atk = 2;
    @Builder.Default
    private Integer speed = 2;
    @Builder.Default
    private Integer hp = 20;
    @Builder.Default
    private List<Integer> availableOptions = new ArrayList<>();
    @Builder.Default
    private List<Integer> decisions = new ArrayList<>();
    @Builder.Default
    private Map<String, Item> items = new HashMap<>();

    public void addItem(Item item) {
        items.put(item.getId(), item);
    }

    public void removeItem(String itemId) {
        items.remove(itemId);
    }

}
