import React from "react";
import { useState } from "react";
import userContext from "./userContext";

const UserState = (props) => {
    const [user,setUser] = useState({
        name:"",
        id:"",
        email:""
    });
    console.log(user)
    return(
        <userContext.Provider value={{user,setUser}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;