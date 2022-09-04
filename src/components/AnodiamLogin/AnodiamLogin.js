import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { getUrl } from "../../utils/UrlUtils";
import { stopChange } from "../../utils/StopCutCopyPaste";
import AskForRegister from "../GenericComponents/AskForRegister";
import MyProfile from '../MyProfile/MyProfile';
import PageHeading from "../GenericComponents/PageHeading";
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import AnodiamTooltipBody from "../GenericComponents/AnodiamTooltipBody";

const AnodiamLogin = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const url = getUrl('loginUrl');
  const { auth, login, logout } = useContext(AuthContext);

  const toggleShowHidePassword = (e) => {
    if(document.getElementById("password").type==="password") {
      document.getElementById("password").type="text";
      document.getElementById("showPasswordIcon").hidden=true;
      document.getElementById("hidePasswordIcon").hidden=false;
      document.getElementById("showPasswordText").hidden=true;
      document.getElementById("hidePasswordText").hidden=false;
    } else {
      document.getElementById("password").type="password";
      document.getElementById("showPasswordIcon").hidden=false;
      document.getElementById("hidePasswordIcon").hidden=true;
      document.getElementById("showPasswordText").hidden=false;
      document.getElementById("hidePasswordText").hidden=true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const loginInfo = { email: username, password }
    const abortCont = new AbortController();
    
    fetch(url, {
      crossDomain: true,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo),
      signal: abortCont.signal
    }).then(res => {
      if (res.ok || res.status===400 || res.status===500) {
        return res.json();
      } else {
        throw Error(res.status);
      }
    }).then(jsonData => {
      setIsPending(false);
        if(jsonData.ok === true
        && (jsonData.data.type==="Bearer")
        && (jsonData.data.roles.includes("STUDENT"))){
        login(jsonData);
        setError('')
      } else {
        setError(`HTTP Error: ${jsonData.message}`);
        logout();
      }
    }).catch(err => {
      if(err.name === 'AbortError') {
        return () => abortCont.abort();
      } else {
        setError(`HTTP Error: ${err.message}`);
        logout();
      }
    }).finally(() => {
      setIsPending(false);
    });
  };

  return (
    <div className="anodiam-container">
      { (Object.entries(auth).length === 0) ?
      <div className="anodiam-body-panel">
        <PageHeading heading='Student Login' />
        <div className="anodiam-body-panel-mid">
          <form className="anodiam-form" onSubmit={handleSubmit}>
            <div className="container anodiam-container">

              { error!=='' && <div className="mandatory">{ error }</div> }
             
              <label>Email:&nbsp;&nbsp;
              <AnodiamTooltipBody title="Your email address is used as your Anodiam username.">
              <i className="fa fa-question-circle anodiam-help-button"></i></AnodiamTooltipBody></label>
              <input
                type="email" required value={username} 
                onChange={(e) => setUsername(e.target.value)} className="form-control" 
                onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
              />
              
              <label>Password:</label>
              <input
                id="password" type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)} className="form-control" 
                onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
              />

              <label className="anodiam-form-container">
              <i className="fa fa-eye password-eye" aria-hidden="true" id="showPasswordIcon"></i>
              <i className="fa fa-eye-slash password-eye" aria-hidden="true" id="hidePasswordIcon" hidden={true}></i>
              <span id="showPasswordText"> Show Password</span><span id="hidePasswordText" hidden={true}> Hide Password</span>
              <input type="checkbox" onClick={toggleShowHidePassword} />
              <span className="anodiam-form-checkmark"></span></label>
            
              { !isPending && <button className="btn btn-primary btn-block">Login</button> }
              { isPending && <button disabled className="btn btn-primary btn-block btn-disabled">
                Logging in {username}...</button> }
            </div>
          </form>
        </div>
        <AskForRegister/>
      </div>
      : <MyProfile /> }
    </div>
  );
}
 
export default AnodiamLogin;