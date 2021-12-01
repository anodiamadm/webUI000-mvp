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
        <PageHeading heading='Buy Courses' />
        <div className="anodiam-body-panel-mid">
          <h2>Functionality for later sprints</h2>
          <p>Show a paginated list of courses, prescribed for purchase by the user according to level, board & language</p>
        </div>
      </div>
    </div>
  );
}
 
export default AnodiamBuyCourses;