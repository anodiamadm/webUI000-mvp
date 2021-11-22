import React, { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router";

const MyLearning = () => {
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  if(auth===null) {
    history.push('/');
  }
  return (
    <div className="anodiam-container">
      <div className="anodiam-body-panel">
        <div className="anodiam-body-panel-top">
          <h2>My Learning</h2>
        </div>
        <div className="anodiam-body-panel-mid">
          Use JWT Token to get the userId.
          <p>Use the userId to get level, board and language information</p>
          <p>Show a paginated list of My Purchased courses...</p>
          <p>Bearer&nbsp;{auth}</p>
        </div>
      </div>
    </div>
  );
}
 
export default MyLearning;