import React,{useState} from "react";
import {useParams} from "react-router-dom";
import useUser from "../hooks/UserHooks/useUser";
import UPanelNav from "./UPanelNav";


function UserPanel(){
    //nwm czy tak będzie dobrze czy nie lepiej jakoś z jwt z cookies pobierać
    // let params = useParams();
    // const userData = useUser(params.id);

    //temp data
    const [userData,setUserData] = useState(
        {
            "userName":"tempUname",
            "roles":["ROLE_USER"],
            "email":"temp@email.com",
            "creationDate":"N/A"
    })
    //temp data


    return(
        <div className="flex flex-col gap-20">
            <UPanelNav/>
            <div className="flex flex-row space-x-16 justify-center items-center">
                <div className="mb-4">
                    <img src="https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-6-1024x1024.jpg" alt="profilePic" className="w-80 h-80 rounded-full" />
                </div>
                <div>
                    <div>Username: {userData.userName}</div>
                    <div>Roles: {userData.roles}</div>
                    <div>Email: {userData.email}</div>
                    <div>Acount creation date: {userData.creationDate}</div>
                </div>
            </div>
        </div>
    )


}

export default UserPanel;