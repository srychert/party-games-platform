
function InputQuestion({setCorrect}){

    const buttonClass =
        "flex flex-col justify-center items-center h-10 w-60 button";

    return(
        <div className={"flex justify-center flex-col items-center"}>
            <input className={"flex justify-center min-w-20"} type={"text"} placeholder={"Correct answer"} onChange={(e)=>setCorrect(e.target.value)} required={true}/>
            <button className={buttonClass} type={"submit"}>Add question</button>
        </div>
    )
}

export default InputQuestion;