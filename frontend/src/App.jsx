import React, { useContext, useEffect, useState } from "react";
import Login from "./Component/EmployeeAuth/Login";
import EmployeeDashboard from "./Component/Dashboard/EmployeeDashboard";
import AdminDashboard from "./Component/Dashboard/AdminDashboard";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";

import { ThemeContext } from "./Context/AppContext";
const App = () => {
const {theme, settheme} = useContext('ThemeContext') ;
   
  // console.log("hfhhr", userdata);

  const [loggeduserdata, setloggeduserdata] = useState(null);
  const [user, setuser] = useState(null);

  useEffect(() => {
    // console.log("theme" ,theme) ;
    if (userdata) {
      const loggedinuser = localStorage.getItem("loggedinuser");
      if (loggedinuser) {
        setuser(loggedinuser);
      }
    }
  }, []);

  return (
    <div className={`border-2 rounded-2xl p-3 #2D2F36`}>
      {/* <h1>{authdata}</h1> */}
      {!user ? <Login></Login> : ""}
      {user === "employee" ? (
        <EmployeeDashboard></EmployeeDashboard>
      ) : (
        user === "admin" && <AdminDashboard></AdminDashboard>
      )}
    </div>
  );
};

export default App;
