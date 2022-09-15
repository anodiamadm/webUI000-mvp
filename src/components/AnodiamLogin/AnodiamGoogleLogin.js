import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const AnodiamGoogleLogin = () => {
  
  const handleCallbackResponse = (response) => {
    console.log(`Encoded JWT token: ${response.credential}`);
    let userObject = jwt_decode(response.credential);
    console.log(`User Object: ${userObject.family_name}`);
+    console.log(`User Object: ${userObject.email}`);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "740566870787-853trkjv95rd4mffc01cinjjqippl427.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <div className="anodiamGoogleControls">
      <div id='googleSignInButton'></div>
    </div>
  );
}
 
export default AnodiamGoogleLogin;