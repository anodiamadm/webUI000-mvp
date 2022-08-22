import { useHistory } from "react-router";
import { useState } from 'react';
import PasswordStrengthMeter from "./PasswordStrengthMeter/PasswordStrengthMeter";
import { getUrl } from "../../utils/UrlUtils";
import { stopChange } from "../../utils/StopCutCopyPaste";
import AskForLogin from "../GenericComponents/AskForLogin";
import PageHeading from "../GenericComponents/PageHeading";
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import AnodiamTooltipBody from "../GenericComponents/AnodiamTooltipBody";

const AnodiamRegister = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [refererEmail, setRefererEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfPassword, setErrorConfPassword] = useState(null);
  const [errorShortUsername, setErrorShortUsername] = useState(null);
  const [errorWeekPassword, setErrorWeekPassword] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState({code:-1, message:"none"});
  const history = useHistory();
  let errFlag = false;
  const url = getUrl('signupUrl');

  const toggleShowHidePassword = (e) => {
    if(document.getElementById("regoPassword").type==="password") {
      document.getElementById("regoPassword").type="text";
      document.getElementById("confPassword").type="text";
      document.getElementById("showPasswordIcon").hidden=true;
      document.getElementById("hidePasswordIcon").hidden=false;
      document.getElementById("showPasswordText").hidden=true;
      document.getElementById("hidePasswordText").hidden=false;
    } else {
      document.getElementById("regoPassword").type="password";
      document.getElementById("confPassword").type="password";
      document.getElementById("showPasswordIcon").hidden=false;
      document.getElementById("hidePasswordIcon").hidden=true;
      document.getElementById("showPasswordText").hidden=false;
      document.getElementById("hidePasswordText").hidden=true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorShortUsername(null);
    setErrorWeekPassword(null)
    setErrorConfPassword(null);
    if (email.length < 8) {
      setErrorShortUsername('should be 8 or more characters long.');
      errFlag = true;
    }
    if (password!==confirmPassword) {
      setErrorConfPassword('Confirm password does not match!');
      errFlag = true;
    }
    if (password.length<8 || password.length>128 || password.includes(email)
                            || !(/[a-z]/.test(password)) || !(/[A-Z]/.test(password))
                            || !(/[0-9]/.test(password)) || !(/[@#$%^&+=]/.test(password))) {
      setErrorWeekPassword('Must be 8-128 characters long containing [a-z], [A-Z], [0-9], [@,#,$,%,^,&,+,=] but NOT your name or email.');
      errFlag = true;
    }
    if(errFlag === false)
    {
      const requestData = { firstName, lastName, email, refererEmail, password }
      setIsPending(true);
      const abortCont = new AbortController();
      fetch(url, {
        crossDomain:true,
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
        signal: abortCont.signal,
      }).then(res => {
        if(!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      }).then(data => {
        setIsPending(false);
        setResponse({code:0, message:data.message});
        console.log(`data = ${data.message}`);
      }).catch(err => {
        if(err.name === 'AbortError') {
          return () => abortCont.abort();
        } else {
          const networkErr = `HTTP Error! ${err.message}`;
          setResponse({code:err.message, message:networkErr});
        }
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
          <PageHeading heading='Register New Student' />
          <div className="anodiam-body-panel-mid">
            <form className="anodiam-form" onSubmit={handleSubmit}>
              <div className="container anodiam-container">
                
                { (response.code===200) && <div className="success-message">{ response.message }</div> }
                { (response.code>0 && response.code!==200) && <div className="mandatory">{ response.message }</div> }

                <label><span className="mandatory">*</span>&nbsp;First Name:</label>
                <input
                  className="form-control" type="text" required value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
            
                <label><span className="mandatory">*</span>&nbsp;Last Name:</label>
                <input
                  className="form-control" type="text" required value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
            
                <label><span className="mandatory">*</span>&nbsp;Email / Username:&nbsp;&nbsp;
                { errorShortUsername && <span className="mandatory">{ errorShortUsername }&nbsp;&nbsp;</span> }
                <AnodiamTooltipBody title="Your email address will be your Anodiam username.">
                <i className="fa fa-question-circle anodiam-help-button"></i></AnodiamTooltipBody></label>
                <input
                  className="form-control" type="text" required value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
                />
            
                <label><span className="mandatory">*</span>&nbsp;Referrer's Email:&nbsp;&nbsp;
                <AnodiamTooltipBody title="You can get discounts when a friend refers you to Anodiam! Anyone who has purchased Anodiam 
                courses earlier can refer. We will send them an email and expect a confirmation within 2 days.">
                <i className="fa fa-question-circle anodiam-help-button"></i></AnodiamTooltipBody></label>
                <input
                  className="form-control" type="email" required value={refererEmail}
                  onChange={(e) => setRefererEmail(e.target.value)} 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
                />
                
                <label><span className="mandatory">*</span>&nbsp;Password:&nbsp;&nbsp;
                { errorWeekPassword && <span className="mandatory">{ errorWeekPassword }&nbsp;&nbsp;</span> }
                <AnodiamTooltipBody title="Must be between 8 to 128 characters containing lower case letters (a-z), upper case letters (A-Z), numerals (0-9) and special characters (@,#,$,%,^,&,+,=) but not your name or email.">
                <i className="fa fa-question-circle anodiam-help-button"></i></AnodiamTooltipBody></label>
                <input 
                  className="form-control" type="password" id="regoPassword"
                  required value={password} onChange={(e) => setPassword(e.target.value)} 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
                />
                
                <PasswordStrengthMeter password={password} email={email} firstname={firstName} />
                
                <label><span className="mandatory">*</span>&nbsp;Confirm Password:&nbsp;
                <i className={(password === confirmPassword && password.length >= 8) ? "fa fa-check success-message" : ""} aria-hidden="true"></i>
                { errorConfPassword && <span className="mandatory">&nbsp;&nbsp;{ errorConfPassword }</span> }</label>
                <input
                  className="form-control" type="password" id="confPassword"
                  required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                  onCut={stopChange} onCopy={stopChange} onPaste={stopChange}
                />
                
                <label className="anodiam-form-container">
                <i className="fa fa-eye password-eye" aria-hidden="true" id="showPasswordIcon"></i>
                <i className="fa fa-eye-slash password-eye" aria-hidden="true" id="hidePasswordIcon" hidden={true}></i>
                <span id="showPasswordText"> Show Password</span><span id="hidePasswordText" hidden={true}> Hide Password</span>
                <input type="checkbox" onClick={toggleShowHidePassword} />
                <span className="anodiam-form-checkmark"></span></label>
                                
                { !isPending && <button className="btn btn-primary btn-block">Register New User</button> }
                { isPending && <button disabled className="btn btn-primary btn-block btn-disabled">
                  Registering {firstName}...</button> }
              </div>
            </form>
          </div>
          <AskForLogin />
      </div>
    </div>
  );
}
 
export default AnodiamRegister;