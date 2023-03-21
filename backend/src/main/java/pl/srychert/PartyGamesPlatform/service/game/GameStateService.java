package pl.srychert.PartyGamesPlatform.service.game;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.model.game.GameState;
import pl.srychert.PartyGamesPlatform.repository.GameStateRepository;

import java.util.Map;

@AllArgsConstructor
@Service
public class GameStateService {
    @Autowired
    GameStateRepository gameStateRepository;

    public String getUnusedPin(String gameId) {
        Map.Entry<String, GameState> randomEntry = gameStateRepository.getRandomUnusedEntry();

        if (randomEntry == null) {
            return null;
        }

        String pin = randomEntry.getKey();
        GameState gameState = randomEntry.getValue();
        gameState.setGameId(gameId);

        gameStateRepository.setPinAsUsed(pin);
        gameStateRepository.update(pin, gameState);
//        System.out.println(gameStateRepository.getAllUsed());
        return pin;
    }

    public void startGame(String pin) {
        gameStateRepository.getUsed(pin).ifPresent(gameState -> {
            gameState.setOnGoing(true);
            gameStateRepository.update(pin, gameState);
        });
    }

    public String getGameId(String pin) {
        return gameStateRepository.getGameId(pin);
    }
}
