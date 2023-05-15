package pl.srychert.PartyGamesPlatform.service.game;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.exception.ApiRequestException;
import pl.srychert.PartyGamesPlatform.model.game.Game;
import pl.srychert.PartyGamesPlatform.model.game.enemy.Enemy;
import pl.srychert.PartyGamesPlatform.model.game.enemy.Slime;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;
import pl.srychert.PartyGamesPlatform.model.game.item.potion.HealPotion;
import pl.srychert.PartyGamesPlatform.model.game.node.MerchantNode;
import pl.srychert.PartyGamesPlatform.model.game.node.Node;
import pl.srychert.PartyGamesPlatform.repository.GameRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@Service
public class GameService {
    @Autowired
    GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAllWithoutNodes();
//        return gameRepository.findAll();
    }

    public List<Game> getGamesByCreatedBy(String userName) {
        return gameRepository.findGamesByCreatedBy(userName);
    }

    public Optional<Game> getGame(String id) {
        return gameRepository.findById(id);
    }

    private Map<Integer, Node> formatNodesById(Map<Integer, Node> map) {
        return map.entrySet().stream()
                // This peek modifies objects in a map
                .peek(entry -> {
                    Node node = entry.getValue();
                    node.setId(entry.getKey());
                    entry.setValue(node);

                    if (node instanceof MerchantNode merchantNode) {
                        Map<String, Item> items = merchantNode.getItemsList().stream()
                                .collect(Collectors.toMap(Item::getId, Function.identity()));

                        merchantNode.setItems(items);
                        entry.setValue(merchantNode);
                    }

                }).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public Game addGame(Game game) {
        Game newGame = Game.builder()
                .title(game.getTitle())
                .description(game.getDescription())
                .createdBy(game.getCreatedBy())
                .nodes(formatNodesById(game.getNodes()))
                .build();
        return gameRepository.insert(newGame);
    }

    public Game deleteGame(String id) {
        Optional<Game> game = gameRepository.findById(id);
        if (game.isPresent()) {
            gameRepository.deleteById(id);
        }
        return game.orElseThrow(() -> new ApiRequestException("No such Game id in DB"));
    }

    public Game updateGame(String id, Game game) {
        Game updatedGame = gameRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such Game id in DB"));

        updatedGame.setTitle(game.getTitle());
        updatedGame.setCreatedBy(game.getCreatedBy());
        updatedGame.setDescription(game.getDescription());
        updatedGame.setTotalTimesPlayed(game.getTotalTimesPlayed());
        updatedGame.setNodes(formatNodesById(game.getNodes()));

        return gameRepository.save(updatedGame);
    }

    public Game incrementTotalTimesPlayed(String id) {
        Game updatedGame = gameRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such Game id in DB"));

        updatedGame.setTotalTimesPlayed(updatedGame.getTotalTimesPlayed() + 1);

        return gameRepository.save(updatedGame);
    }

    public List<Item> getItems() {
        return List.of(
                new HealPotion()
        );
    }

    public List<Enemy> getEnemies() {
        return List.of(
                new Slime()
        );
    }
}
