import React, { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router";

const MyProfile = () => {
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  if(auth===null) {
    history.push('/');
  }
  return (
    <div className="anodiam-container">
      <div className="anodiam-body-panel">
        <div className="anodiam-body-panel-top">
          <h2>Buy Anodiam Courses</h2>
        </div>
        <div className="anodiam-body-panel-mid">
          <p>Use JWT Token to get the userId.</p>
          <p>Get Profile Info using the userId...</p>
          <p>Perform CRUD on the Profile info</p>
          <p>Bearer&nbsp;{auth}</p>
        </div>
      </div>
    </div>
  );
}
 
export default MyProfile;