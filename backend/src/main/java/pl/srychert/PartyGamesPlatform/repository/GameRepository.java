package pl.srychert.PartyGamesPlatform.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.srychert.PartyGamesPlatform.model.Game;

import java.util.List;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {
    List<Game> findGamesByCreatedBy(String createdBy);
}
