import { Link } from "react-router-dom";

const AskForLogin = () => {
  return (
    <div className="anodiam-body-panel-bottom">
      <h6>Already registered?<Link to="/">Login here</Link></h6>
    </div>
  );
}
 
export default AskForLogin;