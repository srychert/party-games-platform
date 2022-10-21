import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function NavBar() {
  return (
    <div>
      <h1>Party Games Platform</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/phone-view">Phone View</Link>
          </li>
          <li>
            <Link to="/enter-game">Enter Game</Link>
          </li>
          <li>
            <Link to="/main-game">Main Game</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default NavBar;
