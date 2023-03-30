package pl.srychert.PartyGamesPlatform.service.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.GameStateDB;
import pl.srychert.PartyGamesPlatform.model.game.Game;
import pl.srychert.PartyGamesPlatform.model.game.GameState;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.model.game.node.Node;
import pl.srychert.PartyGamesPlatform.model.game.node.NodeOption;
import pl.srychert.PartyGamesPlatform.model.game.node.NodeOptionMethod;
import pl.srychert.PartyGamesPlatform.repository.GameRepository;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Stream;

@Service
public class GameStateService {
    @Autowired
    GameRepository gameRepository;

    public Optional<String> getUnusedPin() {
        String pin = String.format("%09d",
                ThreadLocalRandom.current().nextInt(0, 1_000_000_000));
        GameState game = GameStateDB.games.get(pin);

        if (game != null) {
            return Optional.empty();
        }

        return Optional.ofNullable(pin);
    }

    public Optional<GameState> createGameState(String unusedPin, String hostId, String gameId) {
        Optional<Game> game = gameRepository.findById(gameId);

        if (game.isEmpty()) {
            return Optional.empty();
        }

        GameState newGameState = GameState.builder()
                .hostId(hostId)
                .gameId(gameId)
                .build();

        if (GameStateDB.games.containsKey(unusedPin)) {
            return Optional.empty();
        }

        GameStateDB.games.put(unusedPin, newGameState);

        return Optional.ofNullable(newGameState);
    }

    public void freePin(String hostId) {
        Optional<Map.Entry<String, GameState>> gameStateEntry = GameStateDB.games
                .entrySet().stream()
                .filter(entry -> entry.getValue().getHostId().equals(hostId))
                .findFirst();

        gameStateEntry.ifPresent(entry -> GameStateDB.games.remove(entry.getKey()));
    }

    public Optional<GameState> startGame(String pin) {
        Optional<GameState> gameOpt = Optional.ofNullable(GameStateDB.games.get(pin));

        if (gameOpt.isEmpty()) {
            return Optional.empty();
        }

        GameState game = gameOpt.get();
        game.setOnGoing(true);

        return Optional.of(game);
    }

    public Optional<Player> joinPlayer(String pin, String playerId, String nick) {
        GameState game = GameStateDB.games.get(pin);

        if (game == null) {
            return Optional.empty();
        }

        if (game.getOnGoing()) {
            return Optional.empty();
        }

        Player player = Player.builder()
                .id(playerId)
                .nick(nick)
                .options(getNodeOptions(game.getGameId(), 0))
                .build();

        game.getPlayers().put(playerId, player);

        return Optional.ofNullable(player);
    }

    public List<NodeOption> getNodeOptions(String gameId, Integer nodeId) {
        Optional<Game> gameOpt = gameRepository.findById(gameId);

        if (gameOpt.isEmpty()) {
            return new ArrayList<>();
        }

        Game game = gameOpt.get();

        Optional<Node> nodeOpt = Optional.ofNullable(game.getNodes().get(nodeId));

        if (nodeOpt.isEmpty()) {
            return new ArrayList<>();
        }

        Node node = nodeOpt.get();

        return Arrays.stream(node.getClass().getMethods())
                .flatMap(method -> {
                    if (method.isAnnotationPresent(NodeOptionMethod.class)) {
                        return Stream.of(
                                NodeOption.builder()
                                        .name(method.getName())
                                        .parameters(List.of(method.getParameters()))
                                        .build());
                    }
                    return Stream.empty();
                }).toList();
    }
}
