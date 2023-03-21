package pl.srychert.PartyGamesPlatform.controller.rest;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.srychert.PartyGamesPlatform.model.quiz.Quiz;
import pl.srychert.PartyGamesPlatform.service.quiz.QuizService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/quizzes")
public class QuizController {
    @Autowired
    QuizService quizService;

    @GetMapping
    public List<Quiz> getQuizzes(@RequestParam(required = false) String userName) {
        if (userName != null && !userName.isEmpty()) {
            return quizService.getQuizzesByCreatedBy(userName);
        } else {
            return quizService.getAllQuizzes();
        }
    }

    @GetMapping(path = "{quizId}")
    public Optional<Quiz> getQuiz(@PathVariable("quizId") String id) {
        return quizService.getQuiz(id);
    }

    @PostMapping
    public Quiz addQuiz(@Valid @RequestBody Quiz quiz) {
        return quizService.addQuiz(quiz);
    }

    @DeleteMapping(path = "{quizId}")
    @PreAuthorize("@authComponent.isAdmin() || @authComponent.isQuizOwner(#id)")
    public Quiz deleteQuiz(@PathVariable("quizId") String id) {
        return quizService.deleteQuiz(id);
    }

    @PutMapping(path = "{quizId}")
    @PreAuthorize("@authComponent.isAdmin() || @authComponent.isQuizOwner(#id)")
    public Quiz updateQuiz(
            @PathVariable("quizId") String id,
            @Valid @RequestBody Quiz quiz) {
        return quizService.updateQuiz(id, quiz);
    }

}
