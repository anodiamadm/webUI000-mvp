import { GoogleLogout } from 'react-google-login';

const AnodiamGoogleLogout = () => {
  const clientId = "740566870787-kchjltf76dbeck9lbqbh7drtpg2vfees.apps.googleusercontent.com";
  const onSuccess = () => console.log(`LOGOUT Successful!`);
  
  return (
    <div id='googleSignOutButton'>
      <GoogleLogout
        clientId={clientId}
        buttonText="Google Logout"
        onSuccess={onSuccess}
      />
    </div>
  );
}
 
export default AnodiamGoogleLogout;