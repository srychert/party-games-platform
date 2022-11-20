import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

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
  const cardClass =
    "flex flex-col justify-center items-center h-1/2 w-1/2 bg-gray-200 rounded-lg m-10 shadow-lg shadow-blue-500 hover:shadow-blue-700 hover:bg-gray-300 hover:cursor-pointer";
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <div className={cardClass} onClick={() => handleHost()}>
        <div className="text-8xl font-sans">Host</div>
      </div>
      <div className={cardClass} onClick={() => handleJoin()}>
        <div className="text-8xl ">Gracz</div>
      </div>
    </div>
  );
}

export default App;
