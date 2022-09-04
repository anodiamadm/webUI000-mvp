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
  const profileSaveUrl = getUrl('profileSaveUrl');
  const [response, setResponse] = useState({code:-1, message:"none"});
  const [profile, setProfile] = useState('');
  const [profileToSave, setProfileToSave] = useState('');
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
  
  useEffect(() => {
    setProfileToSave({
      fullName,
      phoneNumber,
      address,
      latitude,
      longitude,
      guardiansName,
      guardiansEmail,
      guardiansPhoneNumber,
      boardId,
      levelId
    });
  }, [address, boardId, fullName, guardiansEmail, guardiansName, guardiansPhoneNumber, latitude, levelId, longitude, phoneNumber])
  
  useEffect(() => {
    fetch(getProfileUrl, {
      crossDomain: true,
      method: 'GET',
      headers: { 'Authorization': "Bearer " + auth }
    }).then(res => {
      if(!res.ok) {
        throw Error('Error in fetching from ' + getProfileUrl);
      }
      return res.json();
    }).then(returnedProfile => {
      if(returnedProfile!==null) {
        setProfile(returnedProfile);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const abortCont = new AbortController();
    
    setIsPending(true);
    setError(null);
    fetch(profileSaveUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth },
      body: JSON.stringify(profileToSave),
      signal: abortCont.signal
    }).then(res => {
      if(!res.ok) {
        throw Error(`Error saving profile: ${JSON.stringify(profileToSave)} to url: ${profileSaveUrl}`);
      }
      return res.json();
    }).then(data => {
      setIsPending(false);
      setResponse(data);
    }).catch(err => {
      if(err.name === 'AbortError') {
        return () => abortCont.abort();
      } else {
        const networkErr = `Registration network issue! ${err.message}`;
        setResponse({code:406, message:networkErr});
      }
    });
    setIsPending(false);
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

                { (response.code===0) && <div className="success-message">{ response.message }</div> }
                { (response.code>0) && <div className="mandatory">{ response.message }</div> }
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
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}
 
export default MyProfile;