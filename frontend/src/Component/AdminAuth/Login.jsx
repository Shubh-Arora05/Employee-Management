import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const AdminLogin = () => {
  const {enqueueSnackbar} = useSnackbar() ;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [loading, setLoading] = useState(false);

  const submit_form = async (e) => {
    e.preventDefault();
    setLoading(true);

    // //console.log( "email and password => " ,{ email, password}) ;

    try {
      const response = await axios.post(
        "https://ems-1-66zd.onrender.com/admin/signin",
        { email, password}
      );

      //console.log(response.data) ;

      if (response.status == 200) {
        const token = response.data.token ;
        localStorage.setItem("token", token);
        localStorage.setItem("username", response.data.admin.username ) ;
        // ////console.log("AdminLogin success");
        // //console.log(response);
        // handleAdminLogin(email, password);
        enqueueSnackbar('Successfully Login' , {variant : 'success'} ); 
        navigate("/admin");
      }
      
      setEmail("");
      setPassword("");
      
    } catch (error) {
      enqueueSnackbar('Failed' , {variant : 'error'} ); 
      setLoading(false) ;
      
      // //console.log( "email and password => " ,{ email, password}) ;
      // //console.log("AdminLogin failed", response);
      // alert("AdminLogin failed. Please check your credentials.");
    } 
  };

  return (
    <div className="flex pages flex-col lg:p-36 p-3 gap-24 lg:flex-row h-screen w-screen justify-center items-center">
      <div className = "flex  justify-items-end gap-6 text-xl absolute top-0 left-0 p-10" >

       <a href="/">Home </a>
       <h1 onClick= {()=>{
          navigate('/employeelogin') ;}} className='text-2xl text-blue-500'>Employee Dashboard</h1>
         
       

      </div>
      <div className="border-4 border-green-600  rounded-xl p-9">
        <h1 className="flex justify-center text-3xl items-center pb-7">
          AdminLogin
        </h1>
        <form className="flex gap-6 flex-col justify-center items-center" onSubmit={(e)=>submit_form(e)}>
          <input
            className="border-3 p-2 rounded-xl outline-none border-blue-600"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="email@gmail.com"
            type="email"
          />
          <input
            className="border-3 p-2 rounded-xl outline-none border-blue-600"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="password"
            type="password"
          />
         
          <button
            className={`border-3 p-3 rounded-xl border-black text-2xl font-bold 
                        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-500"}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className='m-2'>
          Don't have an account? <Link to="/adminregistration" className="text-blue-600 underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
