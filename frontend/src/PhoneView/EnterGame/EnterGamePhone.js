import React from "react";
function EnterGamePhone() {
  // Tutaj będzie websocket do serwera

  return (
    <div className="new-game">
      <form>
        <div className="pin">
          <label htmlFor="pin">PIN</label>
          <input type="text" name="pin" id="pin" />
        </div>
        <div className="name">
          <label htmlFor="name">Imię</label>
          <input type="text" name="name" id="name" />
        </div>
      </form>
    </div>
  );
}

export default EnterGamePhone;
