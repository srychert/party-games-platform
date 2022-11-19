package pl.srychert.PartyGamesPlatform.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.exception.ApiRequestException;
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
        if(checkForCreatedByDuplicate(game)){
            throw new ApiRequestException("Duplicate createdBy field");
        }
       return gameRepository.insert(game);
    }

    public Game deleteGame(String id) {
        Optional<Game> game = gameRepository.findById(id);
        if(game.isPresent()) {
            gameRepository.deleteById(id);
        }
        return game.orElseThrow(() -> new ApiRequestException("No such Game id in DB"));
    }

    public Game updateGame(String id, Game game) {
        Game updatedGame = gameRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such Game id in DB"));

        if(checkForCreatedByDuplicate(game)){
            throw new ApiRequestException("Duplicate createdBy field");
        }

        updatedGame.setCreatedBy(game.getCreatedBy());
        updatedGame.setDescription(game.getDescription());
        updatedGame.setAllowedActions(game.getAllowedActions());
        updatedGame.setTotalTimesPlayed(game.getTotalTimesPlayed());

        return gameRepository.save(updatedGame);

    }

    public boolean checkForCreatedByDuplicate(Game game){
        return gameRepository.findGameByCreatedBy(game.getCreatedBy()).isPresent();
    }
}
