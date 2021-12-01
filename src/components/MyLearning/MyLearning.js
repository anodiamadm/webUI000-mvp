import React, { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import PageHeading from '../GenericComponents/PageHeading';

const MyLearning = () => {
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  if(auth===null) {
    history.push('/');
  }
  
  return (
    <div className="anodiam-container">
      <div className="anodiam-body-panel">
        <PageHeading heading='My Learning' />
        <div className="anodiam-body-panel-mid">
          <h2>Functionality for later sprints</h2>
          <p>Show a paginated list of My Purchased courses...</p>
        </div>
      </div>
    </div>
  );
}
 
export default MyLearning;