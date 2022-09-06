import { GoogleLogin } from 'react-google-login';

const AnodiamGoogleLogin = () => {
  const clientId = "740566870787-kchjltf76dbeck9lbqbh7drtpg2vfees.apps.googleusercontent.com";
  const onSuccess = (res) => console.log(`LOGIN Success for user: ${res.profileObj}`);
  const onFailure = (res) => console.log(`LOGOUT Success for res: ${res}`);

  return (
    <div id='googleSignInButton'>
      <GoogleLogin
        clientId={clientId}
        buttonText="Google Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}
 
export default AnodiamGoogleLogin;