import { Link } from "react-router-dom";
import './AnodiamNavbar.css';

const AnodiamNavbar = () => {
  return (
    <nav className="anodiam-navbar">
      <img src={ process.env.PUBLIC_URL + '/resources/images/AnodiamEnergyLogo.png' } alt='A' />
      <h1>nodiam</h1>
      <div className="links">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
 
export default AnodiamNavbar;