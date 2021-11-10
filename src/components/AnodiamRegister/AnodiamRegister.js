import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useState } from 'react';
import PasswordStrengthMeter from "./PasswordStrengthMeter/PasswordStrengthMeter";

const AnodiamRegister = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfPassword, setErrorConfPassword] = useState(null);
  const [errorShortUsername, setErrorShortUsername] = useState(null);
  const [errorWeekPassword, setErrorWeekPassword] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState({code:-1, message:"none"});
  const history = useHistory();
  let errFlag = false;
  const url = 'http://localhost:8444/api/public/student-signup';

  const stopChange = (e) => {
    e.preventDefault();
  };
  
  const toggleShowHidePassword = (e) => {
    if(document.getElementById("regoPassword").type==="password") {
      document.getElementById("regoPassword").type="text";
      document.getElementById("confPassword").type="text";
    } else {
      document.getElementById("regoPassword").type="password";
      document.getElementById("confPassword").type="password";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorShortUsername(null);
    setErrorWeekPassword(null)
    setErrorConfPassword(null);
    if (username.length < 8) {
      setErrorShortUsername('Must be more than 7 characters');
      errFlag = true;
    }
    if (password!==confirmPassword) {
      setErrorConfPassword('Does not match with password');
      errFlag = true;
    }
    if (password.length<8 || password.length>20 || password.includes(username) || password.includes(email)
                            || !(/[a-z]/.test(password)) || !(/[A-Z]/.test(password))
                            || !(/[0-9]/.test(password)) || !(/[@#$%^&+=]/.test(password))) {
      setErrorWeekPassword('Must be 8-20 characters long containing [a-z], [A-Z], [0-9], [@,#,$,%,^,&,+,=] but NOT your username or email');
      errFlag = true;
    }
    if(errFlag === false)
    {
      const requestData = {username, email, password }
      setIsPending(true);
      fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      }).then(res => {
        if(!res.ok) {
          throw Error('Incorrect REST API end-point');
        }
        return res.json();
      }).then(data => {
        setIsPending(false);
        setResponse(data);
      }).catch(err => {
        const networkErr = `Unacceptable network param! ${err.message}`;
        setResponse({code:406, message:networkErr});
      }).finally(() => {
        setIsPending(false);
        history.push('/register');
      });
    }
    setResponse({code:-1, message:"none"});
  };

  return (
    <div className="anodiam-container">
        <div className="anodiam-body-panel">
          <div className="anodiam-body-panel-top">
            <h2>Registration</h2>
          </div>
          <div className="anodiam-body-panel-mid">
            <form className="anodiam-form" onSubmit={handleSubmit}>
              <div className="container anodiam-container">
                
                { (response.code===0) && <div className="success-message">{ response.message }</div> }
                { (response.code>0) && <div className="mandatory">{ response.message }</div> }

                <label><span className="mandatory">*</span>&nbsp;Username:
                { errorShortUsername && <span className="mandatory">&nbsp;&nbsp;{ errorShortUsername }</span> }</label>
                <input
                  className="form-control" type="text" required value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
                />
            
                <label><span className="mandatory">*</span>&nbsp;Email:</label>
                <input
                  className="form-control" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
                />
                
                <label><span className="mandatory">*</span>&nbsp;Password:
                { errorWeekPassword && <span className="mandatory">&nbsp;&nbsp;{ errorWeekPassword }</span> }</label>
                <input 
                  className="form-control" type="password" id="regoPassword"
                  required value={password} onChange={(e) => setPassword(e.target.value)} 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
                />
                
                <PasswordStrengthMeter password={password} username={username} email={email} />
                
                <label><span className="mandatory">*</span>&nbsp;Confirm Password:
                { errorConfPassword && <span className="mandatory">&nbsp;&nbsp;{ errorConfPassword }</span> }</label>
                <input
                  className="form-control" type="password" id="confPassword"
                  required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
                />
                
                <label className="anodiam-form-container">Show Password
                <input type="checkbox" onClick={toggleShowHidePassword} />
                <span className="anodiam-form-checkmark"></span></label>
                                
                { !isPending && <button>Register New User</button> }
                { isPending && <button disabled>Registering {username}...</button> }
              </div>
            </form>
          </div>
          <div className="anodiam-body-panel-bottom">
            <h6>Already registered?<Link to="/">Login here</Link></h6>
          </div>
      </div>
    </div>
  );
}
 
export default AnodiamRegister;