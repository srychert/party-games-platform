import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

function NavBar() {
  const [isLogged, setIsLogged] = React.useState(false);
  const [cookies, setCookies] = useCookies(["user"]);
  useEffect(() => {
    if (cookies.user) {
      setIsLogged(true);
    }
  }, [cookies.user]);

  return (
    <div>
      <h1>Games Guru</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-game">Add Game</Link>
          </li>
          <li>
            {isLogged ? (
              <Link
                onClick={() => {
                  setIsLogged(false);
                }}
              >
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default NavBar;
