import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(null);
  const logout=()=> setAuth(null);
  const login=(auth)=> setAuth(auth);
  return (
    <AuthContext.Provider value={{auth, login, logout}}>
      { props.children }
    </AuthContext.Provider>
  );
}
 
export default AuthContextProvider;