package pl.srychert.PartyGamesPlatform.service.quiz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.exception.ApiRequestException;
import pl.srychert.PartyGamesPlatform.model.quiz.Quiz;
import pl.srychert.PartyGamesPlatform.repository.QuizRepository;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
    @Autowired
    QuizRepository quizRepository;

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public List<Quiz> getQuizzesByCreatedBy(String userName) {
        return quizRepository.findQuizzesByCreatedBy(userName);
    }

    public Optional<Quiz> getQuiz(String id) {
        return quizRepository.findById(id);
    }

    public Quiz addQuiz(Quiz quiz) {
        Quiz newQuiz = Quiz.builder()
                .title(quiz.getTitle())
                .description(quiz.getDescription())
                .questions(quiz.getQuestions())
                .createdBy(quiz.getCreatedBy())
                .build();

        return quizRepository.insert(newQuiz);
    }

    public Quiz deleteQuiz(String id) {
        Optional<Quiz> quiz = quizRepository.findById(id);

        if (quiz.isPresent()) {
            quizRepository.deleteById(id);
        }
        return quiz.orElseThrow(() -> new ApiRequestException("No such Quiz id in DB"));
    }

    public Quiz updateQuiz(String id, Quiz quiz) {
        Quiz updatedQuiz = quizRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such Quiz id in DB"));

        updatedQuiz.setTitle(quiz.getTitle());
        updatedQuiz.setCreatedBy(quiz.getCreatedBy());
        updatedQuiz.setDescription(quiz.getDescription());
        updatedQuiz.setQuestions(quiz.getQuestions());
        updatedQuiz.setTotalTimesPlayed(quiz.getTotalTimesPlayed());

        return quizRepository.save(updatedQuiz);
    }

    public Quiz incrementTotalTimesPlayed(String id) {
        Quiz updatedQuiz = quizRepository
                .findById(id)
                .orElseThrow(() -> new ApiRequestException("No such Quiz id in DB"));

        updatedQuiz.setTotalTimesPlayed(updatedQuiz.getTotalTimesPlayed() + 1);

        return quizRepository.save(updatedQuiz);
    }
}
