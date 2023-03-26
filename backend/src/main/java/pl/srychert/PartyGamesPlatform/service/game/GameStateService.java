package pl.srychert.PartyGamesPlatform.service.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.GameStateDB;
import pl.srychert.PartyGamesPlatform.model.game.Game;
import pl.srychert.PartyGamesPlatform.model.game.GameState;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.repository.GameRepository;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

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

    public boolean startGame(String pin) {
        GameState game = GameStateDB.games.get(pin);

        if (game == null) {
            return false;
        }

        game.setOnGoing(true);
        return true;
    }

    public Optional<Player> joinPlayer(String pin, String playerId, String nick) {
        GameState game = GameStateDB.games.get(pin);

        if (game == null) {
            return Optional.empty();
        }

        if (game.getOnGoing()) {
            return Optional.empty();
        }

        Player player = Player.builder().id(playerId).nick(nick).build();

        game.getPlayers().put(playerId, player);

        return Optional.ofNullable(player);
    }
}
