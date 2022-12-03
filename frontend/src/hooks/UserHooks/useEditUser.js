import React,{useState,useEffect} from "react";
import axios from "axios";

export default function useEditUser(id, name, text){
    const [userData,setUserData] = useState({});

    useEffect(()=>{
        axios
            .put(`http://${process.env.REACT_APP_DOMAIN}:8080/api/v1/users/${id}`,
                name?{"userName":text}:{"password":text})
            .then((res) => {
                setUserData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    },[id])


    return userData;
}

