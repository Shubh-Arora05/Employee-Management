// import React from "react";
// import { useState } from "react";
// // import { Navigate } from 'react-router';
// import { useNavigate } from "react-router";
// import { Link } from "react-router";
// import axios from "axios";
// const Login = ({ handlelogin }) => {
//   const navigate = useNavigate();
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [username, setusername] = useState("");
//   const submit_form = async (e) => {
//     e.preventDefault();
//     console.log(email, password);

//     const response = await axios.post(
//       "https://ems-hm43.onrender.com/employee/signup",
//       { email, password, username }
//     );

//     console.log("jkfrjkkjkjkjdjwkjwfscsc", response);
//     if (response.status === 201) {
//       console.log("login success");
//       navigate("/");
//     }
//     handlelogin(email, password);
//     setemail("");
//     setpassword("");
//     setusername("");
//   };

//   return (
//     <div className="flex flex-col lg:p-36 p-3 gap-24 lg:flex-row h-screen w-screen justify-between items-center">
//       <div className="border-6 border-green-600  rounded-xl p-9">
//         <h1 className="flex justify-center text-3xl items-center pb-7">
//           Login
//         </h1>
//         <form
//           className=" flex gap-6 flex-col justify-center items-center"
//           action=""
//           onSubmit={(e) => {
//             submit_form(e);
//           }}
//         >
//           <input
//             className="border-3 p-2 rounded-xl outline-none border-blue-600"
//             onChange={(e) => {
//               setemail(e.target.value);
//             }}
//             value={email}
//             required
//             placeholder="email@gmail.com"
//             type="email"
//           />
//           <input
//             className="border-3 p-2 rounded-xl outline-none border-blue-600"
//             onChange={(e) => {
//               setpassword(e.target.value);
//             }}
//             value={password}
//             required
//             placeholder="password"
//             type="password"
//           />

//           <input
//             className="border-3 p-2 rounded-xl outline-none border-blue-600"
//             onChange={(e) => {
//               setusername(e.target.value);
//             }}
//             value={username}
//             required
//             placeholder="username"
//             type="name"
//           />
//           <button className="border-3 p-3 rounded-xl border-black  text-2xl  font-bold hover:bg-blue-500  bg-blue-700">
//             Login{" "}
//           </button>
//         </form>

//         <p>
//           Does not have account
//           <Link to="/register">Registration</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";


const Login = () => {
  let id = 0 ;
  const navigate = useNavigate();
   const {enqueueSnackbar} = useSnackbar() ;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit_form = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://ems-1-66zd.onrender.com/employee/signin",
        { email, password}
      );

       



      // console.log(response);

      if (response.status === 200) {
        id = response.data.employee._id ;
        localStorage.setItem("employee_id", id);

        const token = response.data.token ;
        localStorage.setItem("token", token);
        localStorage.setItem("username", response.data.employee.username ) ;
        // console.log(response.data.employee.username) ;
        // console.log("Login success");
        // console.log(response);
        enqueueSnackbar('Successfully Login' , {variant : 'success'} ); 
        // handlelogin(email, password);
        navigate(`/employee/${id}`);
      }
      
      setEmail("");
      setPassword("");
     
    } catch (error) {
      enqueueSnackbar('Failed' , {variant : 'error'} ); 
      // console.error("Login failed", error.response?.data || error.message);
      // alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  pages flex-col lg:p-36 p-3 gap-24 lg:flex-row h-screen w-screen justify-center items-center">
      <div className = "flex  justify-items-end gap-6 text-xl  absolute top-0 left-0 p-10" >

<a href="/">Home </a>
  <h1 onClick= {()=>{
          navigate('/adminlogin') ;}} className='text-2xl text-blue-500'>Admin Dashboard</h1>


</div>
     
      <div className="border-4 border-green-600 rounded-xl p-9">
        <h1 className="flex justify-center text-3xl items-center pb-7">
         Employee Login
        </h1>
        <form className="flex gap-6 flex-col justify-center items-center" onSubmit={submit_form}>
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
          Don't have an account? <Link to="/employeeregistration" className="text-blue-600 underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
