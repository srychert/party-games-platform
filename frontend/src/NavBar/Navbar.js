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
            <Link to="/game_voting">Game Voting</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default NavBar;
