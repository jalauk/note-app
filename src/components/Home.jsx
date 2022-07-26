import React from "react";
import { useEffect,useContext } from "react";
import Notes from "./Notes";
import userContext from "../context/user/userContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const {user} = useContext(userContext)
  const navigate = useNavigate();
  useEffect(() => {
    if(user && user.id!=="")
      navigate('/')
    else
      navigate('/login')
  },[user])

  return (
    <>
      <Notes/>
    </>
  );
}

export default Home;
