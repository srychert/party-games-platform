package pl.srychert.PartyGamesPlatform.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.model.GameState;
import pl.srychert.PartyGamesPlatform.model.GameStateRepository;

import java.util.Map;

@AllArgsConstructor
@Service
public class GameStateService {
    private final GameStateRepository gameStateRepository;

    public String getUnusedPin(){
        Map.Entry<String, GameState> randomEntry = gameStateRepository.getRandomUnusedEntry();

        if(randomEntry == null){
            return null;
        }

        String pin = randomEntry.getKey();

        gameStateRepository.setPinAsUsed(pin);
        System.out.println(gameStateRepository.getAllUsed());
        return pin;
    }

    public void startGame(String pin){
        gameStateRepository.getUsed(pin).ifPresent(gameState -> {
            gameState.setOnGoing(true);
            gameStateRepository.update(pin, gameState);
        });
    }
}
