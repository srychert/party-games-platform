package pl.srychert.PartyGamesPlatform.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.srychert.PartyGamesPlatform.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUserName(String userName);

    Optional<User> findByEmail(String email);
}
