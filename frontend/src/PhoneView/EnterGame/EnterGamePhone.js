import React from "react";
import { useNavigate } from "react-router-dom";
import stompClient from "../../SocketFactory/mySocketFactory";
const client = stompClient;
function EnterGamePhone() {
  let navigate = useNavigate();
  const HanldeSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.pin.value);
    console.log(e.target.name.value);
    client.subscribe(`/topic/public/${e.target.pin.value}`, () => {
      console.log("subscribed");
    });
    client.publish({
      destination: `/chat/${e.target.pin.value}.newUser`,
      body: JSON.stringify({
        type: "CONNECT",
        content: "",
        sender: e.target.name.value,
        time: new Date().getTime(),
      }),
      skipContentLengthHeader: true,
    });
    navigate(`/phone-view`);
  };

  return (
    <div className="new-game">
      <form onSubmit={(e) => HanldeSubmit(e)}>
        <div className="pin">
          <label htmlFor="pin">PIN</label>
          <input type="text" name="pin" id="pin" />
        </div>
        <div className="name">
          <label htmlFor="name">Imię</label>
          <input type="text" name="name" id="name" />
        </div>
        <button type="submit">Dołącz do gry</button>
      </form>
    </div>
  );
}

export default EnterGamePhone;
