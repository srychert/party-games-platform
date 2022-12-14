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
        Game newGame = new Game(
                game.getTitle(),
                game.getDescription(),
                game.getQuestions(),
                game.getCreatedBy());
       return gameRepository.insert(newGame);
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

        updatedGame.setTitle(game.getTitle());
        updatedGame.setCreatedBy(game.getCreatedBy());
        updatedGame.setDescription(game.getDescription());
        updatedGame.setQuestions(game.getQuestions());
        updatedGame.setTotalTimesPlayed(game.getTotalTimesPlayed());

        return gameRepository.save(updatedGame);
    }

    public Game incrementTotalTimesPlayed(String id) {
        Game updatedGame = gameRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such Game id in DB"));

        updatedGame.setTotalTimesPlayed(updatedGame.getTotalTimesPlayed() + 1);

       return  gameRepository.save(updatedGame);
    }
}
