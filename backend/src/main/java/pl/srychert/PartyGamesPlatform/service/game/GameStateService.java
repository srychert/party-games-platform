package pl.srychert.PartyGamesPlatform.service.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.GameStateDB;
import pl.srychert.PartyGamesPlatform.enums.NodeType;
import pl.srychert.PartyGamesPlatform.model.game.Game;
import pl.srychert.PartyGamesPlatform.model.game.GameState;
import pl.srychert.PartyGamesPlatform.model.game.Player;
import pl.srychert.PartyGamesPlatform.model.game.node.*;
import pl.srychert.PartyGamesPlatform.repository.GameRepository;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Stream;

@Service
public class GameStateService {
    @Autowired
    GameRepository gameRepository;

    public Optional<String> getUnusedPin() {
        String pin = String.format("%09d",
                ThreadLocalRandom.current().nextInt(0, 1_000_000_000));
        GameState game = GameStateDB.games.get(pin);

        if (game != null) {
            return Optional.empty();
        }

        return Optional.ofNullable(pin);
    }

    public Optional<GameState> createGameState(String unusedPin, String hostId, String gameId) {
        Optional<Game> game = gameRepository.findById(gameId);

        if (game.isEmpty()) {
            return Optional.empty();
        }

        GameState newGameState = GameState.builder()
                .hostId(hostId)
                .gameId(gameId)
                .build();

        if (GameStateDB.games.containsKey(unusedPin)) {
            return Optional.empty();
        }

        GameStateDB.games.put(unusedPin, newGameState);

        return Optional.ofNullable(newGameState);
    }

    public void freePin(String hostId) {
        Optional<Map.Entry<String, GameState>> gameStateEntry = GameStateDB.games
                .entrySet().stream()
                .filter(entry -> entry.getValue().getHostId().equals(hostId))
                .findFirst();

        gameStateEntry.ifPresent(entry -> GameStateDB.games.remove(entry.getKey()));
    }

    public Optional<GameState> startGame(String pin) {
        Optional<GameState> gameOpt = Optional.ofNullable(GameStateDB.games.get(pin));

        if (gameOpt.isEmpty()) {
            return Optional.empty();
        }

        GameState game = gameOpt.get();
        game.setOnGoing(true);

        return Optional.of(game);
    }

    public Optional<Player> joinPlayer(String pin, String playerId, String nick) {
        GameState game = GameStateDB.games.get(pin);

        if (game == null) {
            return Optional.empty();
        }

        if (game.getOnGoing()) {
            return Optional.empty();
        }

        Player player = Player.builder()
                .id(playerId)
                .nick(nick)
                .options(getNodeOptions(game.getGameId(), 3))
                .currentNode(3)
                .gold(20)
                .build();

        game.getPlayers().put(playerId, player);

        return Optional.ofNullable(player);
    }

    public List<NodeOption> getNodeOptions(String gameId, Integer nodeId) {
        Optional<Game> gameOpt = gameRepository.findById(gameId);

        if (gameOpt.isEmpty()) {
            return new ArrayList<>();
        }

        Game game = gameOpt.get();

        Optional<Node> nodeOpt = Optional.ofNullable(game.getNodes().get(nodeId));

        if (nodeOpt.isEmpty()) {
            return new ArrayList<>();
        }

        Node node = nodeOpt.get();

        return Arrays.stream(node.getClass().getMethods())
                .flatMap(method -> {
                    if (method.isAnnotationPresent(NodeOptionMethod.class)) {

                        final Annotation[][] paramAnnotations = method.getParameterAnnotations();
                        Parameter[] parameters = method.getParameters();
                        List<CustomParameter> visibleParameters = new ArrayList<>();

                        // getting only parameters with @VisibleParam annotation
                        for (int i = 0; i < paramAnnotations.length; i++) {
                            for (Annotation a : paramAnnotations[i]) {
                                if (a instanceof VisibleParam) {
                                    Parameter param = parameters[i];
                                    CustomParameter cp = CustomParameter.builder()
                                            .typeName(param.getParameterizedType().getTypeName())
                                            .name(param.getName()).build();
                                    visibleParameters.add(cp);
                                }
                            }
                        }

                        return Stream.of(NodeOption.builder()
                                .name(method.getName())
                                .parameters(visibleParameters)
                                .build());
                    }

                    return Stream.empty();
                }).toList();
    }

    private Optional<Method> getFirstMethodByName(Method[] allMethods, String methodName) {
        for (Method m : allMethods) {
            if (m.getName().equals(methodName)) {
                System.out.println(m);
                return Optional.of(m);
            }
        }

        return Optional.empty();
    }

    public void callNodeMethod(String pin, String playerId, NodeOption nodeOption) throws
            InvocationTargetException, IllegalAccessException {
        GameState gameState = GameStateDB.games.get(pin);

        if (gameState == null) return;

        Player player = gameState.getPlayers().get(playerId);

        Integer nodeID = player.getCurrentNode();

        Optional<Game> gameOpt = gameRepository.findById(gameState.getGameId());

        if (gameOpt.isEmpty()) return;

        Game game = gameOpt.get();

        Node node = game.getNodes().get(nodeID);

        NodeType nodeType = node.getType();

        String methodName = nodeOption.getName();

        var parameterTypes = nodeOption.getParameters().stream()
                .map(customParameter -> {
                    try {
                        return Class.forName(customParameter.getTypeName());
                    } catch (ClassNotFoundException e) {
                        throw new RuntimeException(e);
                    }
                }).toList();

        System.out.println(parameterTypes);

        List<Object> arguments = nodeOption.getParameters().stream().map(CustomParameter::getValue).toList();

        System.out.println(arguments);

        switch (nodeType) {
            case SKIP -> ((SkipNode) node).skip();
            case HEAL -> {
                Optional<Method> methodOpt = getFirstMethodByName(HealNode.class.getMethods(), methodName);
                if (methodOpt.isEmpty()) return;
                Method method = methodOpt.get();

                // Kinda bad
                if (methodName.equals("buyHeal")) {
                    Integer gold = (Integer) arguments.get(0);
                    var result = method.invoke(node, player, gold);
                    System.out.println(result);
                }

                // TODO resolve wrong argument types
                var result = method.invoke(node, player, arguments);
                System.out.println(result);
            }
        }
    }
}
