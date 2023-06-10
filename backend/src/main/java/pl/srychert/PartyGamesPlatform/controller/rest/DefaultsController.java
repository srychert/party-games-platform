package pl.srychert.PartyGamesPlatform.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.srychert.PartyGamesPlatform.model.game.enemy.Enemy;
import pl.srychert.PartyGamesPlatform.model.game.item.Item;
import pl.srychert.PartyGamesPlatform.service.game.GameService;

import java.util.List;

@RestController
@RequestMapping("api/v1/defaults")
public class DefaultsController {
    @Autowired
    GameService gameService;

    @GetMapping(path = "items")
    public List<Item> getItems() {
        return gameService.getItems();
    }

    @GetMapping(path = "enemies")
    public List<Enemy> getEnemies() {
        return gameService.getEnemies();
    }
}

