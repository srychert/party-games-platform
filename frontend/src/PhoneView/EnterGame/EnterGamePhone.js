import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { messageType, chatMessage } from "../../SocketFactory/message";
import client from "../../SocketFactory/mySocketFactory";

function EnterGamePhone() {
  let navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [connected, setConnected] = useState(client.connected);

  useEffect(() => {
    if (client.connected !== undefined) setConnected(client.connected);
  }, []);

  const callback = function (message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {
      const parsed = JSON.parse(message.body);
      console.log(parsed);
      console.log(client.connected);
    } else {
      console.log("got empty message");
    }
  };

  const HanldeSubmit = (e) => {
    e.preventDefault();
    client.activate();
    client.onConnect = (frame) => {
      client.subscribe(`/topic/public/${pin}`, callback);
      client.publish({
        destination: `/app/chat/${pin}.newUser`,
        body: chatMessage(name, "", messageType.CONNECT),
      });
      setConnected(true);
    };
  };

  const handleMsgSend = () => {
    if (msg === "") return;

    client.publish({
      destination: `/app/chat/${pin}.send`,
      body: chatMessage(name, msg, messageType.CHAT),
      skipContentLengthHeader: true,
    });
  };
  // Tutaj navigate do strony z grą (Chyba, że zrobić to na jednej stronie (Route))
  return (
    <div className="new-game">
      {!connected && (
        <form>
          <div className="pin">
            <label htmlFor="pin">PIN</label>
            <input
              type="text"
              name="pin"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          <div className="name">
            <label htmlFor="name">Imię</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" onClick={(e) => HanldeSubmit(e)}>
            Dołącz do gry
          </button>
        </form>
      )}
      {connected && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="msg">Wiadomość</label>
          <input
            type="text"
            name="msg"
            id="msg"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          ></input>
          <button onClick={handleMsgSend}>Wyślij</button>
        </div>
      )}
    </div>
  );
}

export default EnterGamePhone;
