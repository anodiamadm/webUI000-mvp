import React, { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import PageHeading from '../GenericComponents/PageHeading';

const AnodiamBuyCourses = () => {
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  if(auth===null) {
    history.push('/');
  }
  return (
    <div className="anodiam-container">
      <div className="anodiam-body-panel">
        <div>
          <PageHeading heading='Buy Courses' />
          <div className="anodiam-body-panel-mid">
            <h2>Functionality for later sprints</h2>
            <p>Use userId to get level, board and language information from profile.</p>
            <p>Show a paginated list of courses, prescribed for purchase by the user according to level, board & language</p>
            <p>JWT Token: </p>
          </div>
        </div>    
      </div>
    </div>
  );
}
 
export default AnodiamBuyCourses;