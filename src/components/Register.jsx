import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [change, setChange] = useState({
    name: '',
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setChange({ ...change, [e.target.name]: e.target.value })
  }

  const createuser = async (e) => {
    e.preventDefault()
    const { name,email, password,confirmPassword } = change;
    if(confirmPassword ===password ){
    const { data } = await axios.post('http://localhost:5000/api/auth/createuser', {name, email, password })
    navigate('/login');
  }
  else {
    alert('worng')
  }
  }
  return (
    <>
      <form className='container-sm' onSubmit={createuser}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='confirmPassword' id="confirmPassword" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className='container my-3'>already have an account ? <Link to='/register'>Login</Link></div>
    </>
  )
}

export default Register