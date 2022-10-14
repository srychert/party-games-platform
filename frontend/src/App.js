import React from "react";
import NavBar from "./NavBar/Navbar";
import { Link } from "react-router-dom";
import "./app.css";

function App() {
  return (
    <div className="App">
      TOTALNE DEMO - WERSJA 0.1
      {<NavBar />}
      <div className="app__content">
        <p>
          Twórz własne gry i baw się z przyjaciółmi w grach, które sami
          stworzyliście :)
        </p>
        <Link to="/new_game">
          <button className="App__new-game-button">Nowa gra</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
