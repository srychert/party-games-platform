import {useState} from "react";


function InitialState({setInitialState, setIStateData}){
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [type,setType]=useState("")
    const [debufs,setDebufs]=useState(false)

    function handleInitialState(event){
        event.preventDefault()
        setIStateData({
            "name":name,
            "description":description,
            "type":type,
            "debufs":debufs})
        setInitialState(false)
    }

    return(
        <div>
            <form onSubmit={handleInitialState}>
                <div>
                    <label>Game Name:</label>
                    <input type={"text"} placeholder={"Name"} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                    <label>Game Description:</label>
                    <input type={"text"} placeholder={"Description"} onChange={(e)=>setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Game Type:</label>
                    <select onChange={(e)=>setType(e.target.value)}>
                        <option>select</option>
                        <option value={"singular"}>Singular</option>
                        <option value={"colective"}>Colective</option>
                    </select>
                </div>
                <div>
                    <label>Debufs?</label>
                    <input onChange={()=>setDebufs(!debufs)} type={"checkbox"}/>
                </div>
                <input value={"Submit"} type={"submit"}/>
            </form>
        </div>
    )
}

export default InitialState;