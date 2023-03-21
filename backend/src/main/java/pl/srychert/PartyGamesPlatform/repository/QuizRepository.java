package pl.srychert.PartyGamesPlatform.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.srychert.PartyGamesPlatform.model.quiz.Quiz;

import java.util.List;

@Repository
public interface QuizRepository extends MongoRepository<Quiz, String> {
    List<Quiz> findQuizzesByCreatedBy(String createdBy);
}
