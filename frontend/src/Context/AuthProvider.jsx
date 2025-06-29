import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext() ;

const AuthProvider = ({children}) => {
    const [userdata, setuserdata] = useState(null) ;


   const setuserdata_ = () =>{
    
   }

   

    useEffect(() =>{
        
        setLocalStorage() ; 
        const {employees , admin} = getLocalStorage() ;
        setuserdata({employees, admin}) ;

    },[]) ;

    


  return (
    <div>
        <AuthContext.Provider  value = {{userdata ,setuserdata}} >
            {children}
        </AuthContext.Provider>
       </div>
  )
}

export default AuthProvider
