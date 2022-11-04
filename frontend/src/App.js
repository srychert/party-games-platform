import React, { useEffect, useState } from "react";
import NavBar from "./NavBar/Navbar";
import { Link } from "react-router-dom";
import "./app.css";

function App() {
  const [gameVersions, setGameVersions] = useState([
    { id: 0, name: "test game" },
  ]);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/games")
      .then((res) => res.json())
      .then((data) => {
        setGameVersions(data);
      });
  }, []);
  return (
    <div className="App">
      TOTALNE DEMO - WERSJA 0.1
      {<NavBar />}
      <div className="app__content">
        <p>
          Twórz własne gry i baw się z przyjaciółmi w grach, które sami
          stworzyliście :)
        </p>
        <div className="app__select-game">
          <h2>Wybierz grę</h2>
          {gameVersions.map((gameVersion) => (
            <div>
              {gameVersion.name}
              <Link
                to={{
                  pathname: `/enter-game/${gameVersion.id}`,
                  state: { id: gameVersion.id },
                }}
              >
                <button className="App__new-game-button">Nowa gra</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
