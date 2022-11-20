import { Link } from "react-router-dom";

function JoinGame(props) {
  return (
    <div className="new-game">
      <div className="new-game__start">
        <div className="new-game__pin">
          <div className="new-game-pin__content">{props.pin}</div>
        </div>
        <div className="new-game_start-button">
          <Link to={`/main-game/${props.pin}/${props.selectedId}`}>
            <button className="new-game__start-button">Rozpocznij grę</button>
          </Link>
        </div>
        <div className="new-game__players">
          <div className="new-game-players__content">
            {props.players.map((player) => (
              <div className="player">{player}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinGame;
