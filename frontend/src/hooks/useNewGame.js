import axios from "axios";
import { useEffect, useState } from "react";

function useNewGame(game){
    const [gamedata, setGamedata] = useState({});
    useEffect(() => {
        axios
            .post(`http://${process.env.REACT_APP_DOMAIN}:8080/api/v1/games`,game)
            .then((res) => {
                setGamedata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [game]);
    return gamedata;
}

export default useNewGame;