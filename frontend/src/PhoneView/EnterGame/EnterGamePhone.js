import React from "react";
import { useState, useEffect } from "react";
import { messageType, chatMessage } from "../../SocketFactory/message";

import PhoneView from "../GameVoting/PhoneView";
import Login from "../../Login/Login";

function EnterGamePhone() {
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [connected, setConnected] = useState(false);

  function handleSubmit(event, name, pin) {
    event.preventDefault();
    setName(name);
    setPin(pin);
    setConnected(true);
  }
  console.log(connected);
  console.log(pin);
  return (
    <div className="new-game">
      {!connected ? (
        <Login
          HanldeSubmit={handleSubmit}
          field1="Nick"
          field2="Pin"
          passTypeSwitch={false}
          passtype="text"
          destination="/join"
          submitName="Dołącz do gry"
        />
      ) : (
        <PhoneView nick={name} pin={pin} />
      )}
    </div>
  );
}

export default EnterGamePhone;
