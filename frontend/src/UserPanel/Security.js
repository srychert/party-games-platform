import UPanelNav from "./UPanelNav";
import {useState} from "react";
import {useParams} from "react-router-dom";
import useUser from "../hooks/UserHooks/useUser";
import useEditUser from "../hooks/UserHooks/useEditUser";

export default function Security(){
    //nwm czy tak będzie dobrze czy nie lepiej jakoś z jwt z cookies pobierać
    // let params = useParams();
    // const userData = useUser(params.id);

    const [changeUname,setChangeUname] = useState(false)
    const [changePasswd,setChangePasswd] = useState(false)
    const [name,setName] = useState("")
    const [name2,setName2] = useState("")
    const [pwd,setPwd] = useState("")
    const [oldPwd,setOldPwd] = useState("")
    const [passwordShown, setPasswordShown] = useState(false)
    //temp data
    const [userData,setUserData] = useState(
        {
            "userName":"tempUname",
            "password":"123",
            "accountExpiryTime":"N/A",
            "credentialsExpiryTime ":"N/A"
        })
    //temp data

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const toggleChange= (name) =>{
        if(name==="un"){
            setChangeUname(!changeUname)
            setChangePasswd(false)
        }else if(name==="p"){
            setChangePasswd(!changePasswd)
            setChangeUname(false)
        }
    }


    const handleSubmitName = (event) =>{
        event.preventDefault()
        if(name===name2){
            //normalnie bedzie z tego
            // useEditUser(params.id,true,name)
            setUserData({...userData,"userName":name})
            setName("")
            setName2("")
            setChangeUname(false)
            alert("zmieniono")
        }else {
            alert("names not the same")
            setName("")
            setName2("")
            setChangeUname(false)
        }

    }

    const handleSubmitPwd = (event)=>{
        event.preventDefault()

        if(oldPwd===userData.password){
            //normalnie bedzie z tego
            // useEditUser(params.id,false,pwd)
            setUserData({...userData,"password":pwd})
            setPwd("")
            setOldPwd("")
            setChangePasswd(false)
            alert("zmieniono")
        }else {
            alert("passwords not the same")
            setPwd("")
            setOldPwd("")
            setChangePasswd(false)
        }

    }
    

    const buttonClass =
        "flex flex-col justify-center items-center h-10 w-60 button";

    return(
        <div className="flex flex-col gap-20">
            <UPanelNav/>
            <div className="mx-auto">
                <div className="text-left">Username: {userData.userName}</div>
                <div className="text-left">Account expiry time: {userData.accountExpiryTime}</div>
                <div className="text-left">Credentials expiry time: {userData.accountExpiryTime}</div>
            </div>
            <div className="flex flex-row justify-center items-center">
                <button className={buttonClass} onClick={()=>toggleChange("un")}>Change username</button>
                <button className={buttonClass} onClick={()=>toggleChange("p")}>Change password</button>
                <button className={buttonClass}>Extend expiry time</button>
            </div>
            <div>{changeUname || changePasswd?
                changeUname?
                    <div className="flex items-center justify-center">
                        <form onSubmit={handleSubmitName}>
                            <div className="flex flex-col p-3">
                                <label>New username: </label>
                                <input className="form-input" type="text" onChange={(e)=>setName(e.target.value)}  placeholder="new username"/>
                            </div>
                            <div className="flex flex-col p-3">
                                <label>Confirm new username: </label>
                                <input className="form-input" type="text" onChange={(e)=>setName2(e.target.value)}  placeholder="confirm new username"/>
                            </div>
                            <input className="button" value="Change" type={"submit"}/>
                        </form>
                    </div>
                    :
                    <div className="flex items-center justify-center">
                        <form onSubmit={handleSubmitPwd}>
                            <div className="flex flex-col p-3">
                                <label>Old password: </label>
                                <input className="form-input" type={passwordShown?"text":"password"} onChange={(e)=>setOldPwd(e.target.value)}  placeholder="old password"/>
                            </div>
                            <div className="flex flex-col p-3">
                                <label>New password: </label>
                                <input className="form-input" type={passwordShown?"text":"password"} onChange={(e)=>setPwd(e.target.value)}  placeholder="new password"/>
                            </div>
                            <div className="flex flex-row p-3 gap-1">
                                <label>Show password</label>
                                <input type="checkbox" onChange={togglePassword}/>
                            </div>
                            <input className="button" value="Change" type={"submit"}/>
                        </form>
                    </div>
                :<div/>}</div>

        </div>
    )
}