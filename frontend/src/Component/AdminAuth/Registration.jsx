import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom' ;
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from "notistack";

const AdminRegistration = () => {

  const navigate = useNavigate() ;
  const [loading, setloading] = useState(false) ;
     const {enqueueSnackbar} = useSnackbar() ;
    const [email, setemail] = useState('') ;
    const [password, setpassword] = useState('') ;
    const [username, setusername] = useState('') ;
    const submit_form = async (e) =>{
        e.preventDefault();
        // console.log(email, password);
        setloading(true) ;

        try{
        // handleAdminRegistration(email,password) ;
 
        const response = await axios.post('https://ems-1-66zd.onrender.com/admin/signup' , {
          email: email ,
          password: password ,
          username: username
        }) ;


        console.log(response) ;
       
        const token = response.data.token ;
        localStorage.setItem("token", token);
        localStorage.setItem("username", response.data.newAdmin.username ) ;
        enqueueSnackbar('Successfully Signin' , {variant : 'success'} ); 
        setloading(false) ;
        navigate('/admin') ;
        
        setemail("") ;
        setpassword("") ;
        setusername("") ;
      }
      catch(error){
        setloading(false) ;
        enqueueSnackbar('username and Email should be unique' , {variant : 'error'} ); 
       
        // console.log(error) ;
        // alert("Invalid Email or Password");
      }
    }
  return (
    
        <div className="flex flex-col pages lg:p-36 p-3 gap-24 lg:flex-row h-screen w-screen justify-center items-center"> 
       <div className = "flex  justify-items-end gap-6 text-xl  absolute top-0 left-0 p-10" >

<a href="/">Home </a>

       <h1 onClick= {()=>{
          navigate('/employeelogin') ;}} className='text-2xl text-blue-500'>Employee Dashboard</h1>

</div>
       <div className='border-6 border-green-600  rounded-xl p-9'>
       <h1 className='flex justify-center text-3xl items-center pb-7'>AdminRegistration</h1>
        <form className = " flex gap-6 flex-col justify-center items-center" action="" onSubmit={(e)=>{
           
            submit_form(e);
        }}>
            <input className='border-3 p-2 rounded-xl outline-none border-blue-600' onChange={(e) =>{setemail(e.target.value);}} value = {email} required placeholder='email@gmail.com' type="email" />
            <input className='border-3 p-2 rounded-xl outline-none border-blue-600' onChange={(e) =>{setpassword(e.target.value);}} value = {password} required placeholder='password' type="password" />
           
            <input className='border-3 p-2 rounded-xl outline-none border-blue-600' onChange={(e) =>{setusername(e.target.value);}} value = {username} required placeholder='username' type="text" />
           
            <button className='border-3 p-3 rounded-xl border-black  text-2xl  font-bold hover:bg-blue-500  bg-blue-700'>{loading? "Loading.." :"Registration"} </button>
        
        
        </form>

        <p className='m-2'>
          Already have an account? <Link to="/adminlogin" className="text-blue-600 underline">Login</Link>
        </p>



        </div>
      
        </div>
        
        
    
  )
}

export default AdminRegistration