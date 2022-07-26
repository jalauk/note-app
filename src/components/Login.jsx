import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useEffect,useContext,useState } from "react";
import userContext from "../context/user/userContext";
import axios from 'axios';

function Login() {
  const {user,setUser} = useContext(userContext)
  const navigate = useNavigate();


  const [change, setChange] = useState({
    email:"",
    password:""
  });

  useEffect(() => {
    if(user && user.id!=='')
      navigate('/')
    else
      navigate('/login')
  },[user])

  const handleChange = (e) =>{
    setChange({...change,[e.target.name]:e.target.value})
  }

  const getUser =async (e) => {
    e.preventDefault()
    const {email,password} = change;
    const data = await axios.post('http://localhost:5000/api/auth/login',{email,password},{
      withCredentials: true,
    })
    console.log(data,data.data.userinfo)
    setUser({name:data.data.userinfo.name,email:data.data.userinfo.email,id:data.data.userinfo.id})
  }
  return (
    <>
      <form className='container-sm' onSubmit={getUser}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className='container my-3'>don't have an account ? <Link to='/register'>Register</Link></div>
    </>
  )
}

export default Login