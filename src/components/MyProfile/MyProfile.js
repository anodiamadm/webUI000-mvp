import React, { useContext, useState } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import { stopChange } from "../../utils/StopCutCopyPaste";
import PageHeading from '../GenericComponents/PageHeading';
import IsdPhoneNumber from '../InputFields/IsdPhoneNumber/IsdPhoneNumber';
import PostalAddress from '../InputFields/PostalAddress/PostalAddress';

const MyProfile = () => {
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  if(auth===null) {
    history.push('/');
  }
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [guardiansName, setGuardiansName] = useState('');
  const [guardiansEmail, setGuardiansEmail] = useState('');
  const [guardiansPhoneNumber, setGuardiansPhoneNumber] = useState('');
  const [board, setBoard] = useState('');
  const [level, setLevel] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
  // const [country, setCountry] = useState('');
  // const [state, setState] = useState('');
  // const [town, setTown] = useState('');
  // const [suburb, setSuburb] = useState('');
  // const [zip, setZip] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
  }

  const handlePlacessError = () => {
    setError("Invalid Address");
  }

  return (
    <div className="anodiam-container">
      <div className="anodiam-body-panel">
        <PageHeading heading='My Profile' />
        <div className="anodiam-body-panel-mid">
          <form className="anodiam-form" onSubmit={handleSubmit}>
              <div className="container anodiam-container">

                { error && <div className="mandatory">{ error }</div> }

                <label>Name:</label>
                <input type="text" value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} className="form-control" 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange} />
                
                <label>Mobile Number:</label>
                <IsdPhoneNumber phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
                
                <label>Board:</label>
                <select className="form-control" value={board}
                onChange={(e) => setBoard(e.target.value)} >
                  <option value="ICSE">ICSE</option>
                  <option value="CBSE">CBSE</option>
                  <option value="other">Other</option>
                </select>

                <label>Class:</label>
                <select className="form-control" value={level}
                onChange={(e) => setLevel(e.target.value)} >
                  <option value="9">IX</option>
                  <option value="10">X</option>
                  <option value="11">XI</option>
                  <option value="12">XII</option>
                  <option value="other">Other</option>
                </select>
                
                <label>Address:</label>
                <PostalAddress address={address} setAddress={setAddress} className="form-control" 
                  onError={handlePlacessError} clearItemsOnError={true}
                  setCoordinates={setCoordinates} />
                
                <label>Guardian's Name:</label>
                <input type="text" value={guardiansName} 
                  onChange={(e) => setGuardiansName(e.target.value)} className="form-control" 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange} />
                
                <label>Guardian's Mobile Number:</label>
                <IsdPhoneNumber phoneNumber={guardiansPhoneNumber} setPhoneNumber={setGuardiansPhoneNumber} />
                
                <label>Guardian's Email:</label>
                <input type="email" value={guardiansEmail}
                  onChange={(e) => setGuardiansEmail(e.target.value)} className="form-control" 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange} />
                
                { !isPending && <button className="btn btn-primary btn-block">Update Profile</button> }
                { isPending && <button disabled className="btn btn-primary btn-block btn-disabled">
                  Updating Profile: {fullName}...</button> }
              </div>
            </form>
          <p>Phone # {phoneNumber}</p>
          <p>Address: {address}</p>
          <p>Lat Long: {coordinates.lat}, {coordinates.lng} Use to validate non null lat lng for valid address</p>
          <p>Guardian's Phone # {guardiansPhoneNumber}</p>
          <p>Use JWT Token to get the Profile Info</p>
          <p>Perform CRUD on the Profile info</p>
        </div>
      </div>
    </div>
  );
}
 
export default MyProfile;