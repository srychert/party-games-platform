import React from "react";
import { useNavigate } from "react-router-dom";
import stompClient from "../../SocketFactory/mySocketFactory";
const client = stompClient;
function EnterGamePhone() {
  let navigate = useNavigate();
  const HanldeSubmit = (e) => {
    e.preventDefault();
    client.subscribe(`/topic/public/${e.target.pin.value}`, () => {
      console.log("subscribed");
    });
    client.publish({
      destination: `/app/public/${e.target.pin.value}.newUser`,
      body: JSON.stringify({
        sender: e.target.name.value,
        content: "",
        type: "CONNECT",
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
