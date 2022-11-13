import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./entergame.css";
import axios from "axios";
import stompClient from "../../SocketFactory/mySocketFactory";

function CreateGame() {
  const params = useParams();
  const [pin, setPin] = useState("");
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    axios
      .post(`http://localhost:8080/api/v1/games/new/${params.id}`)
      .then((res) => {
        setPin(res.data.pin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);
  useEffect(() => {
    if (pin) {
      const client = stompClient;
      client.subscribe(`topic/public/${pin}`, (message) => {
        const data = JSON.parse(message);
        console.log("message", data);
        setPlayers(JSON.parse(data));
      });

      client.publish({
        destination: `/app/chat/${pin}.newUser`,
        body: JSON.stringify({
          type: "CONNECT",
          content: "",
          sender: "Host",
          time: new Date().getTime(),
        }),
        skipContentLengthHeader: true,
      });
    }
  }, [pin]);
  return (
    <div className="new-game">
      <h1>Nowa gra</h1>
      <div className="new-game__start">
        <div className="new-game__pin">
          <h2>Twój PIN</h2>
          <div className="new-game-pin__content">{pin}</div>
        </div>
        <Link to={`/main-game/${params.id}`}>
          <button className="new-game__start-button">Rozpocznij grę</button>
        </Link>
        <div className="new-game__players">
          <h2>Gracze</h2>
          <div className="new-game-players__content">
            {players.map((player) => (
              <div>{player}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGame;
