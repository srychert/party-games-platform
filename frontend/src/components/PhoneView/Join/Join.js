import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Join() {
  const [pin, setPin] = useState("");
  const [nick, setNick] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  function handleJoin(event) {
    event.preventDefault();
    setCookie("nick", nick);
    navigate("/join/" + pin);
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <form
        onSubmit={(event) => handleJoin(event)}
        className="p-10 shadow-md shadow-sky-300"
      >
        <div className="flex flex-col p-2">
          <label htmlFor="pin">Pin</label>
          <input
            className="form-input"
            type="text"
            name="pin"
            id="pin"
            autoComplete="off"
            onChange={(e) => setPin(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="nick">Nick</label>
          <input
            className="form-input"
            type="text"
            name="nick"
            id="nick"
            autoComplete="off"
            onChange={(e) => setNick(e.target.value)}
          />
        </div>
        <div className="inline">
          <button type="submit" className="button">
            Zaloguj
          </button>
        </div>
      </form>
    </div>
  );
}

export default Join;
