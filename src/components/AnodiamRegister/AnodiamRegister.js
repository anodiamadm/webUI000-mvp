import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import 'bootstrap/dist/css/bootstrap.min.css'
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
  const history = useHistory();
  let errFlag = false;
  
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
    setIsPending(true);
    setErrorShortUsername(null);
    setErrorWeekPassword(null)
    setErrorConfPassword(null);
    if (username.length < 8) {
      setErrorShortUsername('Must be more than 7 characters');
      errFlag = true;
    }
    if (password!==confirmPassword) {
      setErrorConfPassword('Does not match with password!');
      errFlag = true;
    }
    if (password.length<8 || password.length>20 || password.includes(username)
                            || !(/[a-z]/.test(password)) || !(/[A-Z]/.test(password))
                            || !(/[0-9]/.test(password)) || !(/[@#$%^&+=]/.test(password))) {
      setErrorWeekPassword('Must be 8-20 characters long containing [a-z], [A-Z], [0-9], [@,#,$,%,^,&,+,=] but NOT your username');
      errFlag = true;
    }
    if(errFlag === false)
    {
      console.log('Proceed to save Rego Data');
    }
    errFlag = false;
    setIsPending(false);
    history.push('/register');
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
                <label><span className="mandatory">*</span>&nbsp;Username:
                { errorShortUsername && <span className="mandatory">&nbsp;&nbsp;{ errorShortUsername }</span> }</label>
                <input
                  className="form-control" type="text" required value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
            
                <label><span className="mandatory">*</span>&nbsp;Email:</label>
                <input
                  className="form-control" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <label><span className="mandatory">*</span>&nbsp;Password:
                { errorWeekPassword && <span className="mandatory">&nbsp;&nbsp;{ errorWeekPassword }</span> }</label>
                <input 
                  className="form-control" type="password" id="regoPassword"
                  required value={password} onChange={(e) => setPassword(e.target.value)}
                />
                
                <PasswordStrengthMeter password={password} username={username} />
                
                <label className="anodiam-form-container">Show Password
                <input type="checkbox" onClick={toggleShowHidePassword} />
                <span className="anodiam-form-checkmark"></span></label>
                
                <label><span className="mandatory">*</span>&nbsp;Confirm Password:
                { errorConfPassword && <span className="mandatory">&nbsp;&nbsp;{ errorConfPassword }</span> }</label>
                <input
                  className="form-control" type="password" id="confPassword"
                  required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                
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