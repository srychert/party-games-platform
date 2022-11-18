import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./app.css";

function App() {
  let navigate = useNavigate();
  const [auth, setAuth] = React.useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  useEffect(() => {
    if (cookies.user) {
      setAuth(true);
    }
  }, []);
  function handleHost() {
    if (auth) {
      navigate("/host");
    } else {
      navigate("/login");
    }
  }
  function handleJoin() {
    navigate("/join");
  }

  return (
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
              Player jest odpowiedzialny za udział w grze i wykonywanie poleceń
              hosta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
