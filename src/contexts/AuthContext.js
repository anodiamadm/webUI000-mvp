import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [userId, setUserId] = useState('');
  const [auth, setAuth] = useState(null);
  const logout=()=>{
    setAuth(null);
    setUserId('');
  }
  const login=(jwt, userId)=>{
    setAuth(jwt);
    setUserId(userId);
  }
  return (
    <AuthContext.Provider value={{userId, auth, login, logout}}>
      { props.children }
    </AuthContext.Provider>
  );
}
 
export default AuthContextProvider;