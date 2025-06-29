import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const AppProvider = ({ children }) => {

  const fun = () =>{
    if(localStorage.getItem('theme') == "dark" || localStorage.getItem('theme') == "light")
    return localStorage.getItem('theme') ;
    
    return "dark" ;


  }
  const [theme, settheme] = useState(fun());
  
  const [updated_data, setupdated_data] = useState(0);

  

  useEffect(()=>{
     //console.log("updated_data : " ,updated_data) ;
     localStorage.setItem('theme', theme) ;
  },[theme, updated_data])

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://ems-1-66zd.onrender.com/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(response.data);
    } catch (error) {
      //console.error("Error fetching tasks:", error);
    }
  };


  return (
    <div>
      <ThemeContext.Provider value={{ theme, settheme, updated_data ,setupdated_data}}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};
