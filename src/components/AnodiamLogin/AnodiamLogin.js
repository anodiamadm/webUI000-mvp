import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";

const AnodiamLogin = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const url = 'http://localhost:8445/login';

  const stopChange = (e) => {
    e.preventDefault();
  };

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
    }).then(data => {
      console.log('Header: ', data);
      setIsPending(false);
      history.push('/home');
      history.push('/');
    }).catch(err => {
      if(err.name === 'AbortError') {
        console.log('Fetch Aborted');
      } else {
        setError(err.message);
      }
    }).finally(() => {
      setIsPending(false);
    });
    return () => abortCont.abort();
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