import { Link } from "react-router-dom";
import './AnodiamNavbar.css';

const AnodiamNavbar = () => {
  return (
    <nav className="anodiam-navbar">
      <img src={ process.env.PUBLIC_URL + '/resources/images/AnodiamEnergyLogo.bmp' } alt='A' />
      <h1>nodiam</h1>
      <div className="links">
        <Link to="/">Login</Link>
        <Link to="/create">Register</Link>
      </div>
    </nav>
  );
}
 
export default AnodiamNavbar;