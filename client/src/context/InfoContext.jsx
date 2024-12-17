import React , { createContext , useContext , useState } from "react";

const InfoContext = createContext({
  roleContext: '',
  setRoleContext: () => {},
  skillsContext: [],
  setSkillsContext: () => {},
});

export const InfoProvider = ({ children }) => {
    const [roleContext, setRoleContext] = useState('');
    const [skillsContext , setSkillsContext] = useState([])

    console.log(roleContext);
    
  
    return (
      <InfoContext.Provider value={{ roleContext, setRoleContext , skillsContext , setSkillsContext }}>
        {children}
      </InfoContext.Provider>
    );
  };
  
  export const useInfoContext = () => useContext(InfoContext);