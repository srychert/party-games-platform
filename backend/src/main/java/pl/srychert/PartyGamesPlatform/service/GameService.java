package pl.srychert.PartyGamesPlatform.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.model.Game;
import pl.srychert.PartyGamesPlatform.model.GameRepository;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class GameService {
    private final GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public List<Game> getGamesByCreatedBy(String email) {
        return gameRepository.findGamesByCreatedBy(email);
    }

    public Optional<Game> getGame(String id) {
        return gameRepository.findById(id);
    }

    public void addGame(Game game) {
        gameRepository.insert(game);
    }

    public void deleteGame(String id) {
        gameRepository.deleteById(id);
    }

    public Game updateGame(String id, String description) {
        Game game = gameRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException(String.format("Game with ID %s does not exist", id)));
        game.setDescription(description);
        return gameRepository.save(game);
    }
}
