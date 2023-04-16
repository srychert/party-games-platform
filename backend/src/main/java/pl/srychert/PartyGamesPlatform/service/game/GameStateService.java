package pl.srychert.PartyGamesPlatform.service.game;

import jakarta.validation.Valid;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.srychert.PartyGamesPlatform.GameStateDB;
import pl.srychert.PartyGamesPlatform.enums.NodeType;
import pl.srychert.PartyGamesPlatform.exception.NodeOptionProcessingException;
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

        Map<String, Player> players = game.getPlayers();

        if (players.containsKey(playerId)) return Optional.empty();

        Player player = Player.builder()
                .id(playerId)
                .nick(nick)
                .options(getNodeOptions(game.getGameId(), 0))
                .currentNode(0)
                .gold(20)
                .build();

        players.put(playerId, player);

        return Optional.of(player);
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
                return Optional.of(m);
            }
        }

        return Optional.empty();
    }

    private Class<? extends Node> getNodeClass(NodeType nodeType) throws NodeOptionProcessingException {
        switch (nodeType) {
            case SKIP -> {
                return SkipNode.class;
            }
            case HEAL -> {
                return HealNode.class;
            }
            case MERCHANT -> {
                return MerchantNode.class;
            }
            case FIGHT -> {
                return FightNode.class;
            }
            default -> {
                throw new NodeOptionProcessingException(String.format("No class for NodeType %s", nodeType.toString()));
            }
        }
    }

    public Boolean isGameOngoing(String pin) {
        GameState gameState = GameStateDB.games.get(pin);

        if (gameState == null) return false;

        return gameState.getOnGoing();
    }

    public Optional<Player> getPlayer(String pin, String playerId) {
        GameState gameState = GameStateDB.games.get(pin);

        if (gameState == null) return Optional.empty();

        Player player = gameState.getPlayers().get(playerId);

        return Optional.ofNullable(player);
    }

    public JSONObject callNodeMethod(String pin, String playerId, NodeOption nodeOption)
            throws NodeOptionProcessingException, InvocationTargetException, IllegalAccessException {

        GameState gameState = Optional.ofNullable(GameStateDB.games.get(pin)).orElseThrow(
                () -> new NodeOptionProcessingException(String.format("No game with pin %s", pin)));

        Player player = gameState.getPlayers().get(playerId);

        Game game = gameRepository.findById(gameState.getGameId()).orElseThrow(
                () -> new NodeOptionProcessingException(String.format("No game data for id %s", gameState.getGameId())));

        Node node = game.getNodes().get(player.getCurrentNode());

        List<Object> arguments = new ArrayList<>(nodeOption.getParameters().stream().map(CustomParameter::getValue).toList());

        String methodName = nodeOption.getName();
        System.out.println(methodName);

        Method method = getFirstMethodByName(getNodeClass(node.getType()).getMethods(), methodName).orElseThrow(() ->
                new NodeOptionProcessingException(String.format("Method with name '%s' not found on current node", methodName)));

        arguments.add(0, player);
        return (JSONObject) method.invoke(node, arguments.toArray(new Object[0]));
    }

    public Map<String, List<JSONObject>> handleNextRound(String pin) throws Exception {
        GameState gameState = Optional.ofNullable(GameStateDB.games.get(pin)).orElseThrow(
                () -> new Exception(String.format("No game with pin %s", pin)));

        Game game = gameRepository.findById(gameState.getGameId()).orElseThrow(
                () -> new NodeOptionProcessingException(String.format("No game data for id %s", gameState.getGameId())));

        Map<String, Player> players = gameState.getPlayers();

        Map<String, List<JSONObject>> nextNodesForPlayers = new HashMap<>();

        for (Map.Entry<String, Player> entry : players.entrySet()) {
            Player player = entry.getValue();

            Node node = game.getNodes().get(player.getCurrentNode());

            var nodesForPlayer = node.getNextNodesID().stream().map(integer -> {
                @Valid Node nextNode = game.getNodes().get(integer);
                return new JSONObject().put("id", nextNode.getId()).put("type", nextNode.getType());
            }).toList();

            nextNodesForPlayers.put(player.getId(), nodesForPlayer);

            // TODO set flag to enable next node choosing
            player.setCurrentRoundCompleted(false);
        }

        return nextNodesForPlayers;
    }
}
