import {useState} from "react";


function AddQuestions({questions,setQuestions}){
    const [type,setType]=useState("")
    const [qusetion,setQuestion]=useState("")
    const [answers,setAnswers]=useState([])
    const [correct,setCorrect]=useState("")

    const [a,setA]=useState("")
    const [b,setB]=useState("")
    const [c,setC]=useState("")
    const [d,setD]=useState("")


    const handleNext = (event) =>{
        event.preventDefault()
        setAnswers([a,b,c,d])
        const newQuestion={"type":type,"question":qusetion,"answers":answers,"correct":correct}
        setQuestions([...questions,newQuestion])
        setType("")
        setQuestion("")
        setAnswers([])
        setCorrect("")
        setA("")
        setB("")
        setC("")
        setD("")
    }

    return(
        <div>
            <form>
                <div>
                    <label>Set question type:</label>
                    <select value={""} onChange={(e)=>setType(e.target.value)}>
                        <option value={""}>select</option>
                        <option value={"abcd"}>ABCD</option>
                        <option value={"true/false"}>true/false</option>
                        <option value={"input"}>input</option>
                    </select>
                </div>
                <div>
                    <label>Set question:</label>
                    <input value={qusetion} type={"text"} placeholder={"question"} onChange={(e)=>setQuestion(e.target.value)}/>
                </div>
                <div>
                    {type==="abcd"?
                        <div>
                            <input type={"text"} placeholder={"option A"} onChange={(e)=>setA(e.target.value)}/>
                            <input type={"text"} placeholder={"option B"} onChange={(e)=>setB(e.target.value)}/>
                            <input type={"text"} placeholder={"option C"} onChange={(e)=>setC(e.target.value)}/>
                            <input type={"text"} placeholder={"option D"} onChange={(e)=>setD(e.target.value)}/>
                            <select onChange={(e)=>setCorrect(e.target.value)}>
                                <option>select correct</option>
                                <option value={"1"}>A</option>
                                <option value={"2"}>B</option>
                                <option value={"3"}>C</option>
                                <option value={"4"}>D</option>
                            </select>
                            <button onClick={handleNext}>Next question</button>
                        </div>
                        :type==="input"?
                            <div>input</div>
                            :type==="true/false"?
                                <div>true/false</div>
                                :null}
                </div>
            </form>
        </div>
    )
}

export default AddQuestions;