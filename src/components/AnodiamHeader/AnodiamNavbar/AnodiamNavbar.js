import { NavLink } from "react-router-dom";
import './AnodiamNavbar.css';

const AnodiamNavbar = () => {

  return (
    <nav className="navbar navbar-expand-md anodiam-navbar">
      <NavLink to="/" exact>
        <img src={ process.env.PUBLIC_URL + '/resources/images/AnodiamEnergyLogo.png' } alt='A' /><h1>nodiam</h1>
      </NavLink>
      <button
        className="navbar-toggler anodiam-burger" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle Navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse links" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li ><NavLink className="anodiam-nav-link" to="/" exact>Login</NavLink></li>
          <li ><NavLink className="anodiam-nav-link" to="/register" exact>Register</NavLink></li>
          <li ><NavLink className="anodiam-nav-link" to="/home" exact>Home</NavLink></li>
          <li ><NavLink className="anodiam-nav-link" to="/error" exact>Error</NavLink></li>
          <li ><NavLink className="anodiam-nav-link" to="/undefined" exact>Redirect</NavLink></li>
        </ul>
      </div>
    </nav>
  )
  /* (
    <nav className="anodiam-navbar">
      <NavLink to="/" exact>
        <img src={ process.env.PUBLIC_URL + '/resources/images/AnodiamEnergyLogo.png' } alt='A' /><h1>nodiam</h1>
      </NavLink>
      <div className="links">
        <NavLink to="/" exact>Login</NavLink>
        <NavLink to="/register" exact>Register</NavLink>
      </div>
    </nav>
  ) */
};
 
export default AnodiamNavbar;