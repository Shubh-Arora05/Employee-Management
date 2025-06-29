import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import { getLocalStorage } from '../../utils/localStorage';

import { useContext } from 'react';
import { ThemeContext } from "../../Context/AppContext";
const TaskListNumber = () => {

   const {id} = useParams() ;

  const [data,setdata] = useState([]) ; 
  const {theme, updated_data} = useContext(ThemeContext) ;

  const func = async () =>{
    // console.log("id" ,id) ;



    const response = await axios.get(`https://ems-1-66zd.onrender.com/employee/${localStorage.getItem('employee_id')}` , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }      
    }) ;

    // console.log("jkjkkjdkkdklsklsGMG,G,G,G,,Gdkllkds" ,response , response.data.taskId) ;
    setdata(response.data.taskCount) ;

  }

  useEffect(() =>{

    func() ;
    // console.log(data) ;
  
  
  },[updated_data])
   // console.log(data) ;
  return (
   <div className="task-list-number overflow-x-hidden w-screen ">
    {  data ?
      <div className='lg:flex lg:flex-row flex flex-col justify-between  mt-7 px-9 gap-2'

>

        <div className='bg-yellow-400 flex flex-col  lg:w-[20%] justify-between gap-6 p-5 border-2 rounded-xl'>
           <h1 className='text-3xl'>{data.activeTasks?data.activeTasks:0}</h1>
           <h3 className='2xl'>Active Tasks</h3>
        </div>

        <div className='bg-green-400 flex flex-col lg:w-[20%]  justify-between gap-6 p-5 border-2 rounded-xl'>
           <h1 className='text-3xl'>{data.completedTasks ? data.completedTasks : 0
           }</h1>
           <h3 className='2xl'>Completed
           Tasks</h3>
        </div>

        <div className='bg-red-400 flex flex-col  lg:w-[20%]  justify-between gap-6 p-5 border-2 rounded-xl'>
           <h1 className='text-3xl'>{data.failedTasks? data.failedTasks: 0}</h1>
           <h3 className='2xl'>
           Failed Tasks</h3>
        </div>


        <div className='bg-blue-400 flex flex-col  lg:w-[20%]  justify-between gap-6 p-5 border-2 rounded-xl'>
           <h1 className='text-3xl'>{data.newTasks ? data.newTasks: 0}</h1>
           <h3 className='2xl'>New Task</h3>
        </div>

        </div> : ""} 


        


       

    </div>
  )
}

export default TaskListNumber