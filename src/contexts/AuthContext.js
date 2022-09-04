import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({});
  const logout=()=> setAuth({});
  const login=(authObj)=> {
    setAuth(authObj);
  }
  return (
    <AuthContext.Provider value={{auth, login, logout}}>
      { props.children }
    </AuthContext.Provider>
  );
}
 
export default AuthContextProvider;