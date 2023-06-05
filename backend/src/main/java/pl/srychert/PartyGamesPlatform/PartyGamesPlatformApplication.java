package pl.srychert.PartyGamesPlatform;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.MongoTemplate;
import pl.srychert.PartyGamesPlatform.enums.QuestionType;
import pl.srychert.PartyGamesPlatform.model.quiz.Question;
import pl.srychert.PartyGamesPlatform.model.quiz.Quiz;
import pl.srychert.PartyGamesPlatform.model.user.User;
import pl.srychert.PartyGamesPlatform.repository.GameRepository;
import pl.srychert.PartyGamesPlatform.repository.QuizRepository;
import pl.srychert.PartyGamesPlatform.repository.UserRepository;

import java.util.List;

@SpringBootApplication
public class PartyGamesPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(PartyGamesPlatformApplication.class, args);
    }

    // Add test data
    // TODO delete later
    @Bean
    @Profile("!test")
    CommandLineRunner runner(UserRepository userRepository, GameRepository gameRepository,
                             QuizRepository quizRepository, MongoTemplate mongoTemplate) {
        return args -> {
            User user = new User("user",
                    "{bcrypt}$2a$10$4v6Q8zDpz35rUfOe3uzuVushJXYz/xHr2CHgnF2D2fS62Qg/14XPq",
                    true, List.of("USER"), "user@example.com");
            String createdBy = user.getUserName();

            Quiz quiz = Quiz.builder()
                    .title("Test quiz")
                    .description("Description")
                    .questions(
                            List.of(Question.builder()
                                    .question("What is your favourite colour?")
                                    .type(QuestionType.ABCD)
                                    .answers(List.of("Blue", "Red", "Yellow", "Green"))
                                    .correct(0)
                                    .build())
                    )
                    .totalTimesPlayed(10L)
                    .createdBy(createdBy)
                    .build();

            userRepository.findByUserName(user.getUserName()).ifPresentOrElse(g -> {
                System.out.println(g.toString());
            }, () -> {
                userRepository.insert(user);
            });

            if (quizRepository.findQuizzesByCreatedBy(createdBy).isEmpty()) {
                quizRepository.insert(quiz);
            }

            User admin = new User("admin",
                    "{bcrypt}$2a$10$4v6Q8zDpz35rUfOe3uzuVushJXYz/xHr2CHgnF2D2fS62Qg/14XPq",
                    true, List.of("USER", "ADMIN"), "admin@example.com");

            userRepository.findByUserName(admin.getUserName()).ifPresentOrElse(g -> {
                System.out.println(g.toString());
            }, () -> {
                userRepository.insert(admin);
            });
        };
    }

}
