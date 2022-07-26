import React from "react";
import { useContext } from "react";

import {Link} from "react-router-dom";
import userContext from "../context/user/userContext";

function Navbar() {
  const {user} = useContext(userContext)
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to='/'>Notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
      </ul>
        {(user && user.id!=='') ? <h4>welcome {user.name}</h4> : ''}
    </div>
  </div>
</nav>
    </>
  );
}

export default Navbar;
