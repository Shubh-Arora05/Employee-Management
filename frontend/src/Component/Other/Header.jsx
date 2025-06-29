import React, { useContext } from "react";
import { ThemeContext } from "../../Context/AppContext";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
const Header = ({ data }) => {
  const { theme, settheme } = useContext(ThemeContext);
    const {enqueueSnackbar} = useSnackbar() ;
  
  // console.log(localStorage.getItem("username"));
  const navigate = useNavigate();
  // if(data)
  const handle_logout = () => {
    // console.log("nfndn");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // enqueueSnackbar('Successfully Logout' , {variant : 'success'} ); 

    navigate("/");
    localStorage.setItem("loggedinuser", null);

    // localStorage.setItem('token' , "") ;

    window.location.reload();
  };
  // const name = localStorage.getItem('loggedinuser').username ;
  // console.log("data" , name) ;
  return (
    <div>
      <div className="flex  justify-between p-6 overflow-x-hidden">
        <h1 className="text-md lg:text-2xl font-medium">
          Hello <br />
          <span className="text-md lg:text-2xl  font-bold">
            {" "}
            {localStorage.getItem("username")}👋
          </span>
        </h1>

        <div className="flex gap-2">

        <button
          className={`border-2 rounded-2xl  text-md lg:text-lg  p-1 ${theme}`}
          onClick={() =>{ settheme(theme === "light" ? "dark" : "light")
          
          }}
        >
          {theme === "light" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>

        <button
          onClick={() => {
            handle_logout();
          }}
          className="bg-red-600 p-1 text-md lg:text-lg  rounded-xl  font-bold"
        >
          Logout
        </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
