package pl.srychert.PartyGamesPlatform;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import pl.srychert.PartyGamesPlatform.model.*;


import java.util.List;

@SpringBootApplication
public class PartyGamesPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(PartyGamesPlatformApplication.class, args);
	}

	// Add test data
	// TODO delete later
	@Bean
	CommandLineRunner runner(UserRepository user_repository, GameRepository game_repository, MongoTemplate mongoTemplate){
		return args -> {
			User user = new User("user",
					"{bcrypt}$2a$10$4v6Q8zDpz35rUfOe3uzuVushJXYz/xHr2CHgnF2D2fS62Qg/14XPq",
					true, List.of("USER"), "user@example.com");
			String createdBy = user.getUserName();
			Game game = new Game(
				"Epic game", "desc here", List.of(new Question(
						"What is your favourite colour?",
					QuestionType.ABCD,
					List.of("Yellow", "Blue", "Red", "Green"),
					1
			)), 10L, createdBy);

			user_repository.findByUserName(user.getUserName()).ifPresentOrElse(g -> {
				System.out.println(g.toString());
			}, ()-> {user_repository.insert(user);});

			if(game_repository.findGamesByCreatedBy(createdBy).isEmpty()){
				game_repository.insert(game);
			}
		};
	}

}
