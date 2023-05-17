package pl.srychert.PartyGamesPlatform.controller.rest;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.srychert.PartyGamesPlatform.model.game.Game;
import pl.srychert.PartyGamesPlatform.model.game.enemy.Enemy;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;
import pl.srychert.PartyGamesPlatform.service.game.GameService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/games")
public class GameController {
    @Autowired
    GameService gameService;

    @GetMapping
    public List<Game> getGames(@RequestParam(required = false) String userName) {
        if (userName != null && !userName.isEmpty()) {
            return gameService.getGamesByCreatedBy(userName);
        } else {
            return gameService.getAllGames();
        }
    }

    @GetMapping(path = "{gameId}")
    public Optional<Game> getGame(@PathVariable("gameId") String id) {
        return gameService.getGame(id);
    }

    @PostMapping
    public Game addGame(@Valid @RequestBody Game game) {
        return gameService.addGame(game);
    }

    @DeleteMapping(path = "{gameId}")
    @PreAuthorize("@authComponent.isAdmin() || @authComponent.isGameOwner(#id)")
    public Game deleteGame(@PathVariable("gameId") String id) {
        return gameService.deleteGame(id);
    }

    @PutMapping(path = "{gameId}")
    @PreAuthorize("@authComponent.isAdmin() || @authComponent.isGameOwner(#id)")
    public Game updateGame(
            @PathVariable("gameId") String id,
            @Valid @RequestBody Game game) {
        return gameService.updateGame(id, game);
    }

    @GetMapping(path = "items")
    public List<Item> getItems() {
        return gameService.getItems();
    }

    @GetMapping(path = "enemies")
    public List<Enemy> getEnemies() {
        return gameService.getEnemies();
    }

}
