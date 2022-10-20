package pl.srychert.PartyGamesPlatform.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.srychert.PartyGamesPlatform.model.Game;
import pl.srychert.PartyGamesPlatform.service.GameService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/games")
@AllArgsConstructor
public class GameController {
    private final GameService gameService;

    @GetMapping
    public List<Game> getGames(@RequestParam(required = false) String email){
        if(email != null && !email.isEmpty()){
            return gameService.getGamesByCreatedBy(email);
        }
        else {
            return gameService.getAllGames();
        }
    }

    @GetMapping(path = "{gameId}")
    public Optional<Game> getGame(@PathVariable("gameId") String id){
        return gameService.getGame(id);
    }

    @PostMapping
    public void addGame(@RequestBody Game game){
        gameService.addGame(game);
    }

    @DeleteMapping(path = "{gameId}")
    public void deleteGame(@PathVariable("gameId") String id){
        gameService.deleteGame(id);
    }

    @PutMapping(path = "{gameId}")
    public Game updateGame(
            @PathVariable("gameId") String id,
            @RequestParam(required = false) String description) {
        return gameService.updateGame(id, description);
    }

}
