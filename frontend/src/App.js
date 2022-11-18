import React from "react";
import { useNavigate } from "react-router-dom";
import "./app.css";

function App() {
  let navigate = useNavigate();
  function handleHost() {
    navigate("/host");
  }
  function handleJoin() {
    navigate("/join");
  }

  return (
    <div className="App">
      <div className="SelectPlayerRole">
        <div className="card" onClick={() => handleHost()}>
          <div className="Host_card">
            <div className="Host__title">Host</div>
            <div className="Host_description">
              <p>
                Host jest odpowiedzialny za tworzenie gry i zarządzanie jej
                przebiegiem.
              </p>
            </div>
          </div>
        </div>
        <div className="card" onClick={() => handleJoin()}>
          <div className="Player">
            <div className="Player__title">Gracz</div>
            <div className="Player_description">
              <p>
                Player jest odpowiedzialny za udział w grze i wykonywanie
                poleceń hosta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
