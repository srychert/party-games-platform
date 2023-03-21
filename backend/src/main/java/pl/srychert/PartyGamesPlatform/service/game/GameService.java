package pl.srychert.PartyGamesPlatform.service.game;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.exception.ApiRequestException;
import pl.srychert.PartyGamesPlatform.model.game.Game;
import pl.srychert.PartyGamesPlatform.repository.GameRepository;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class GameService {
    @Autowired
    GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public List<Game> getGamesByCreatedBy(String userName) {
        return gameRepository.findGamesByCreatedBy(userName);
    }

    public Optional<Game> getGame(String id) {
        return gameRepository.findById(id);
    }

    public Game addGame(Game game) {
        Game newGame = Game.builder()
                .title(game.getTitle())
                .description(game.getDescription())
                .questions(game.getQuestions())
                .createdBy(game.getCreatedBy())
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
        updatedGame.setQuestions(game.getQuestions());
        updatedGame.setTotalTimesPlayed(game.getTotalTimesPlayed());

        return gameRepository.save(updatedGame);
    }

    public Game incrementTotalTimesPlayed(String id) {
        Game updatedGame = gameRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such Game id in DB"));

        updatedGame.setTotalTimesPlayed(updatedGame.getTotalTimesPlayed() + 1);

        return gameRepository.save(updatedGame);
    }
}
