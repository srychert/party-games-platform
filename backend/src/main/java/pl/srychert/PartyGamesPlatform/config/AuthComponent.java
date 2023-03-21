package pl.srychert.PartyGamesPlatform.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.srychert.PartyGamesPlatform.exception.ApiRequestException;
import pl.srychert.PartyGamesPlatform.model.game.Game;
import pl.srychert.PartyGamesPlatform.model.quiz.Quiz;
import pl.srychert.PartyGamesPlatform.model.user.User;
import pl.srychert.PartyGamesPlatform.repository.GameRepository;
import pl.srychert.PartyGamesPlatform.repository.QuizRepository;
import pl.srychert.PartyGamesPlatform.repository.UserRepository;

import java.util.List;
import java.util.Optional;


@Component
public class AuthComponent {
    @Autowired
    UserRepository userRepository;

    @Autowired
    GameRepository gameRepository;

    @Autowired
    QuizRepository quizRepository;

    public boolean hasPermission(String id) {
        if (isAdmin()) {
            return true;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();

        // Grant permission if user is the owner
        Optional<User> user = userRepository.findByUserName(name);
        String userId = user.map(User::getId).orElse(null);

        return id.equals(userId);
    }

    public boolean hasPermissionByName(String userName) {
        if (isAdmin()) {
            return true;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();

        return userName.equals(name);
    }

    public boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        return authorities.contains("SCOPE_ADMIN");
    }

    public boolean isGameOwner(String gameId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();

        Game game = gameRepository.findById(gameId).orElseThrow(() -> new ApiRequestException("No such Game id in DB"));

        return name.equals(game.getCreatedBy());
    }

    public boolean isQuizOwner(String quizId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();

        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new ApiRequestException("No such Quiz id in DB"));

        return name.equals(quiz.getCreatedBy());
    }
}
