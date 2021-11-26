import { Link } from "react-router-dom";

const AskForRegister = () => {
  return (
    <div className="anodiam-body-panel-bottom">
      <h6>Not yet registered?<Link to="/register">Register here</Link></h6>
    </div>
  );
}
 
export default AskForRegister;