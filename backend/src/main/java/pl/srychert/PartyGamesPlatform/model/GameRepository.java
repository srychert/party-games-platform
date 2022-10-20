package pl.srychert.PartyGamesPlatform.model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {
    Optional<Game> findGameByCreatedBy(String createdBy);
    List<Game> findGamesByCreatedBy(String createdBy);
}
