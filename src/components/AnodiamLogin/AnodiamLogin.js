import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import React, { useContext } from 'react';
import { useState } from "react/cjs/react.development";
import { AuthContext } from "../../contexts/AuthContext";
import { getUrl } from "../../utils/UrlUtils";
import { stopChange } from "../../utils/StopCutCopyPaste";

const AnodiamLogin = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  let errFlag = false;
  const history = useHistory();
  const url = getUrl('loginUrl');
  const { login } = useContext(AuthContext);

  const toggleShowHidePassword = (e) => {
    if(document.getElementById("password").type==="password") {
      document.getElementById("password").type="text";
    } else {
      document.getElementById("password").type="password";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    const loginInfo = { username, password }
    const abortCont = new AbortController();
    
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo),
      signal: abortCont.signal
    }).then(res => {
      if(!res.ok) {
        throw Error('Unauthorized login attempt! Wrong username or password.');
      }
      return res.json();
    }).then(jwt => {
      login(jwt);
      setIsPending(false);
    }).catch(err => {
      if(err.name === 'AbortError') {
        return () => abortCont.abort();
      } else {
        setError(err.message);
        errFlag=true;
      }
    }).finally(() => {
      setIsPending(false);
      if(errFlag===false) {
        history.push('/buyCourses');
      } else {
        history.push('/');
      }
    });
  };

  return (
    <div className="anodiam-container">
        <div className="anodiam-body-panel">
          <div className="anodiam-body-panel-top">
            <h2>Login</h2>
          </div>
          <div className="anodiam-body-panel-mid">
            <form className="anodiam-form" onSubmit={handleSubmit}>
              <div className="container anodiam-container">

                { error && <div className="mandatory">{ error }</div> }

                <label>Username:</label>
                <input
                  type="text" required value={username} 
                  onChange={(e) => setUsername(e.target.value)} className="form-control" 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
                />
                
                <label>Password:</label>
                <input
                  id="password" type="password" required value={password}
                  onChange={(e) => setPassword(e.target.value)} className="form-control" 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
                />

                <label className="anodiam-form-container">Show Password
                <input type="checkbox" onClick={toggleShowHidePassword} />
                <span className="anodiam-form-checkmark"></span></label>
              
                { !isPending && <button className="btn btn-primary btn-block">Login</button> }
                { isPending && <button disabled className="btn btn-primary btn-block btn-disabled">
                  Logging in {username}...</button> }
              </div>
            </form>
          </div>
          <div className="anodiam-body-panel-bottom">
            <h6>Not yet registered?<Link to="/register">Register here</Link></h6>
          </div>
      </div>
    </div>
  );
}
 
export default AnodiamLogin;