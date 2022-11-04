import React from "react";
import { Link } from "react-router-dom";
function EnterGamePhone() {
  // Tutaj będzie websocket do serwera
  const HanldeSubmit = (e) => {
    console.log(e.target.name.value);
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
        <Link to="/phone-view">
          <button type="submit">Dołącz do gry</button>
        </Link>
      </form>
    </div>
  );
}

export default EnterGamePhone;
