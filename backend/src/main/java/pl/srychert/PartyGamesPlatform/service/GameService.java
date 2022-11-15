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

    public Game addGame(Game game) {
       return gameRepository.insert(game);
    }


    public Game deleteGame(String id) {
        Optional<Game> game = gameRepository.findById(id);
        if(game.isPresent()) {
            gameRepository.deleteById(id);
        }
        return game.orElse(null);
    }


    public Game updateGame(String id, String description, List<String> allowedActions, Long totalTimesPlayed, String createdBy) {
        Game game = gameRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException(String.format("Game with ID %s does not exist", id)));
        if(description != null){
            game.setDescription(description);
        }
        if(allowedActions != null){
            game.setAllowedActions(allowedActions);
        }
        if(totalTimesPlayed != null){
            game.setTotalTimesPlayed(totalTimesPlayed);
        }
        if(createdBy != null){
            game.setCreatedBy(createdBy);
        }
        return gameRepository.save(game);
    }
}
