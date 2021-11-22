import { NavLink } from "react-router-dom";
import React, { useContext } from 'react';
import './AnodiamNavbar.css';
import { AuthContext } from "../../../contexts/AuthContext";

const AnodiamNavbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const doLogout = () => logout();
  return (
    <nav className="navbar navbar-expand-md anodiam-navbar">
      <NavLink to="/buyCourses" exact>
        <img src={ process.env.PUBLIC_URL + '/resources/images/AnodiamEnergyLogo.png' } alt='A' /><h1>nodiam</h1>
      </NavLink>

      <button
        className="navbar-toggler anodiam-burger" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle Navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse links" id="navbarSupportedContent">
        {
          auth===null ?
            <ul className="navbar-nav">
              <li ><NavLink className="anodiam-nav-link" to="/" exact>Login</NavLink></li>
              <li ><NavLink className="anodiam-nav-link" to="/register" exact>Register</NavLink></li>
            </ul> :
            <ul className="navbar-nav">
              <li ><NavLink className="anodiam-nav-link" to="/buyCourses" exact>Buy Courses</NavLink></li>
              <li ><NavLink className="anodiam-nav-link" to="/profile" exact>My Profile</NavLink></li>
              <li ><NavLink className="anodiam-nav-link" to="/learning" exact>My Learning</NavLink></li>
              <li ><NavLink className="anodiam-nav-link" onClick={doLogout} to="/" exact>Logout</NavLink></li>
            </ul>
        }
      </div>
    </nav>
  )
};
 
export default AnodiamNavbar;