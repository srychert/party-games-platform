import React, { useEffect, useState } from "react";
import NavBar from "./Host/NavBar/Navbar";
import { Link } from "react-router-dom";
import "./app.css";

function App() {
  const [gameVersions, setGameVersions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/games")
      .then((res) => res.json())
      .then((data) => {
        setGameVersions(data);
      });
  }, []);

  return (
    <div className="App">
      TOTALNE DEMO - WERSJA 0.2
      {<NavBar />}
      <div className="app__content">
        <div className="app__select-game">
          <h2>Wybierz grę</h2>
          {gameVersions.map((gameVersion) => (
            <div key={gameVersion.id}>
              {gameVersion.description}
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
