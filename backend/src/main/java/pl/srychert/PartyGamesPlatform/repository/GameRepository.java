package pl.srychert.PartyGamesPlatform.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import pl.srychert.PartyGamesPlatform.model.game.Game;

import java.util.List;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {
    List<Game> findGamesByCreatedBy(String createdBy);

    @Query(value = "{}", fields = "{ 'nodes' : 0 }")
    List<Game> findAllWithoutNodes();
}
