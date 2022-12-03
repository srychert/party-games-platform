import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import InitialState from "./InitialState";
import AddQuestions from "./AddQuestions";
import useNewGame from "../hooks/useNewGame";

function AddGame(){
    const naviagte=useNavigate()
    const [initialState,setInitialState] = useState(true)
    const [iStateData,setIStateData] = useState({
        "name":"",
        "description":"",
        "type":"",
        "debufs":false
    })

    const [questions,setQuestions]=useState([])


    const handleSubmit = ()=>{
        const game={"name": iStateData.name,
            "description": iStateData.description,
            "type": iStateData.type,
            "questions":questions,
            "debufs": iStateData.debufs,
            "createdBy":"N/A"}
        console.log(game)
        // useNewGame(game)
        naviagte("/addgame")
    }


    return(
        <div>
            {initialState?
                <InitialState setInitialState={setInitialState} setIStateData={setIStateData}/>:
                <AddQuestions questions={questions} setQuestions={setQuestions}/>}
            <button onClick={handleSubmit}>Submit Game</button>
        </div>
    )
}

export default AddGame;

