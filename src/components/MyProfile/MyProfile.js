import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import { stopChange } from "../../utils/StopCutCopyPaste";
import PageHeading from '../GenericComponents/PageHeading';
import IsdPhoneNumber from '../InputFields/IsdPhoneNumber/IsdPhoneNumber';
import PostalAddress from '../InputFields/PostalAddress/PostalAddress';
import BoardDropdown from '../InputFields/AnodiamDropdowns/BoardDropdown';
import LevelDropdown from '../InputFields/AnodiamDropdowns/LevelDropdown';
import { getUrl } from '../../utils/UrlUtils';

const MyProfile = () => {
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  if(auth===null) {
    history.push('/');
  }
  const getProfileUrl = getUrl('getProfileUrl');
  const profileCreateUrl = getUrl('profileCreateUrl');
  const profileUpdateUrl = getUrl('profileUpdateUrl');
  const [profile, setProfile] = useState('');
  const [profileToSave, setProfileToSave] = useState('');
  const [studentProfileId, setStudentProfileId] = useState('')
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [guardiansName, setGuardiansName] = useState('');
  const [guardiansEmail, setGuardiansEmail] = useState('');
  const [guardiansPhoneNumber, setGuardiansPhoneNumber] = useState('');
  const [boardId, setBoardId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let profileSaveUrl = '';
    const abortCont = new AbortController();
    
    setIsPending(true);
    setError(null);
    if(profile==='') {
      profileSaveUrl = profileCreateUrl;
    } else {
      profileSaveUrl = profileUpdateUrl;
    }
    setProfileToSave({
      "studentProfileId": {studentProfileId},
      "fullName": {fullName},
      "phoneNumber": {phoneNumber},
      "address": {address},
      "latitude": {latitude},
      "longitude": {longitude},
      "guardiansName": {guardiansName},
      "guardiansEmail": {guardiansEmail},
      "guardiansPhoneNumber": {guardiansPhoneNumber},
      "board": { "boardId": {boardId} },
      "level": { "levelId": {levelId} },
      "suburb": null,
      "user": { "userId": 25 },
      "language": { "language_id": 1 }
    });

    console.log('profileToSave: ', profileToSave.boardId);
    fetch(profileSaveUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                 'Authorization': "Bearer " + auth },
      body: JSON.stringify(profileToSave),
      signal: abortCont.signal
    })
    setIsPending(false);
  }

  const handlePlacessError = () => {
    setError("Invalid Address");
  }

  useEffect(() => {
    fetch(getProfileUrl, {
      headers: { 'Authorization': "Bearer " + auth }
    }).then(res => {
      if(!res.ok) {
        throw Error('Error in fetching from ' + getProfileUrl);
      }
      return res.json();
    }).then(returnedProfile => {
      if(returnedProfile!==null) {
        setProfile(returnedProfile);
        setStudentProfileId(returnedProfile.studentProfileId);
        setFullName(returnedProfile.fullName);
        setPhoneNumber(returnedProfile.phoneNumber);
        setGuardiansName(returnedProfile.guardiansName);
        setGuardiansEmail(returnedProfile.guardiansEmail);
        setGuardiansPhoneNumber(returnedProfile.guardiansPhoneNumber);
        setBoardId(returnedProfile.board.boardId);
        setLevelId(returnedProfile.level.levelId);
        setAddress(returnedProfile.address);
        setLatitude(returnedProfile.latitude);
        setLongitude(returnedProfile.longitude);
      } else {
        setProfile('')
      }
    }).catch(err => {
      setError(err.message);
    });
  }, [auth, getProfileUrl])

  return (
    <div className="anodiam-container">
      <div className="anodiam-body-panel">
        <PageHeading heading='My Profile' />
        <div className="anodiam-body-panel-mid">
          <form className="anodiam-form" onSubmit={handleSubmit}>
              <div className="container anodiam-container">

                { error && <div className="mandatory">{ error }</div> }

                <label>Name:</label>
                <input type="text" value={fullName===null ? '' : fullName}
                  onChange={(e) => setFullName(e.target.value)} className="form-control" 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange} />

                <label>Mobile Number:</label>
                <IsdPhoneNumber phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />

                <label>Board:</label>
                <BoardDropdown boardId={boardId} setBoardId={setBoardId} setError={setError}/>

                <label>Class:</label>
                <LevelDropdown levelId={levelId} setLevelId={setLevelId} setError={setError}/>
                
                <label>Address:</label>
                <PostalAddress address={address} setAddress={setAddress} className="form-control" 
                  onError={handlePlacessError} clearItemsOnError={true} latitude={latitude} setLatitude={setLatitude}
                  longitude={longitude} setLongitude={setLongitude} />

                <label>Guardian's Name:</label>
                <input type="text" value={guardiansName===null ? '' : guardiansName}
                  onChange={(e) => setGuardiansName(e.target.value)} className="form-control" 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange} />
                
                <label>Guardian's Mobile Number:</label>
                <IsdPhoneNumber phoneNumber={guardiansPhoneNumber} setPhoneNumber={setGuardiansPhoneNumber} />
                
                <label>Guardian's Email:</label>
                <input type="email" value={guardiansEmail===null ? '' : guardiansEmail}
                  onChange={(e) => setGuardiansEmail(e.target.value)} className="form-control" 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange} />
                
                { !isPending && (profile!=='') && <button className="btn btn-primary btn-block">
                  Update Profile</button> }
                { !isPending && (profile==='') && <button className="btn btn-primary btn-block">
                  Save Profile</button> }
                { isPending && (profile!=='') && <button disabled className="btn btn-primary btn-block btn-disabled">
                  Updating Profile: {fullName}...</button> }
                { isPending && (profile==='') && <button disabled className="btn btn-primary btn-block btn-disabled">
                  Saving Profile: {fullName}...</button> }

                <p>studentProfileId: {studentProfileId}</p>
                <p>fullName: {fullName}</p>
                <p>phoneNumber: {phoneNumber}</p>
                <p>guardiansName: {guardiansName}</p>
                <p>guardiansEmail: {guardiansEmail}</p>
                <p>guardiansPhoneNumber: {guardiansPhoneNumber}</p>
                <p>boardId: {boardId}</p>
                <p>levelId: {levelId}</p>
                <p>address: {address}</p>
                <p>latitude: {latitude}</p>
                <p>latitude: {longitude}</p>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}
 
export default MyProfile;