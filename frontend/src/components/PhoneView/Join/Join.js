import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import client from "../../../services/SocketFactory/mySocketFactory";
import { messageType, chatMessage } from "../../../services/SocketFactory/message";
import Loading from "../Loding/Loding";



function Join() {
  const [pin, setPin] = useState("");
  const [nick, changeNick] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const callback = (message) => {
    if(message.body){
      const parsed = JSON.parse(message.body);
      console.log(parsed);
      if(parsed.type === messageType.START_GAME){
        navigate(`/join/${pin}`);
      }else{
        console.log("got empty message");
      }
    }
  };

  useEffect(() => {
    client.activate();
  }, [])

  function handleJoin(event) {
    event.preventDefault();
    auth.setNick(nick);
    client.publish({
      destination: `/app/chat/${pin}.newUser`,
      body: chatMessage(nick, "", messageType.CONNECT),
    });
    client.subscribe(`/topic/public/${pin}`, callback);
    setLoading(true);
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      {loading ? (
        <Loading/>) :(
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
            onChange={(e) => changeNick(e.target.value)}
          />
        </div>
        <div className="inline">
          <button type="submit" className="button">
            Dołącz
          </button>
        </div>
      </form>
        )}
    </div>
  );
}

export default Join;
