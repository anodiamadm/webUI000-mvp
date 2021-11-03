import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";

const AnodiamLogin = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();

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
    setLoginError(null);
    if(username==='anirban123' && password==='anirban@123') {
      history.push('/home');
    } else {
      setLoginError('Wrong username or password');
    }
    setIsPending(false);
    // const blog = { username, email, password };
    // setIsPending(true);
    // history.push('/');
    // fetch('http://localhost:8000/users', {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(blog)
    // }).then(() => {
    //   console.log('New User Created');
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

                { loginError && <div className="mandatory">{ loginError }</div> }

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
              
                { !isPending && <button>Login</button> }
                { isPending && <button disabled>Logging in {username}...</button> }
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