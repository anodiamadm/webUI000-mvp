import { Link } from 'react-router-dom';
import './Anodiam404.css'

const Anodiam404 = () => {
  return (
  <div className="anodiam-container">
    <div className="anodiam-body-panel background-404">
      <div className="anodiam-body-panel-top">
        <h1>&#x26A0;&nbsp;&nbsp;Error page&nbsp;!</h1>
      </div>
      <div className="anodiam-body-panel-mid">
        <div className="anodiam-form">
          <div className="anodiam-body-panel-bottom">
            <h6>Go Back! <Link to="/">Link to login</Link></h6>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
 
export default Anodiam404;