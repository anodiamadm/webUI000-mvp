import { Link } from "react-router-dom";
import './AnodiamFooter.css';

const AnodiamFooter = () => {
  return (
    <div id="anodiam-footer">
      <div className="anodiam-container">
        <div className="row">
          <div className="col-sm-4">
            <span>Anodiam © 2023</span>
          </div>
          <div className="col-sm-4">
            <Link className="anodiam-nav-link" to="/about" exact="true">About us</Link>
          </div>
          <div className="col-sm-4">
            <Link className="anodiam-nav-link" to="/contact" exact="true">Contact us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AnodiamFooter;