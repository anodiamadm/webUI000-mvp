import { createContext, useState } from 'react';

export const PreferenceContext = createContext();

const PreferenceContextProvider = (props) => {
  const [languageId, setLanguageId] = useState(1);
  return (
    <PreferenceContext.Provider value={{languageId, setLanguageId}}>
      { props.children }
    </PreferenceContext.Provider>
  );
}
 
export default PreferenceContextProvider;