// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../Context/AuthProvider";
// import axios from "axios";
// const AllTask = () => {

//   // console.log("vgh",authdata) ;

//   const [data, setdata] = useState('') ;
  

//   const func = async () =>{

//     const response = await axios.get(`https://ems-hm43.onrender.com/employee` , {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }      
//     }) ;

//     console.log("jkjkkjdkkdklsklsdkllkds" ,response.data) ;
//     setdata(response.data) ;

//   }

//   useEffect(() =>{

//     func() ;
//     console.log(data) ;
  
  
//   },[])
//   return (
//     <div className="h-40 bg-black overflow-auto rounded-lg m-3 ">
     
     
//       <div className="m-4 flex flex-col gap-3 pt-6">

//         <div className="flex  text-xl justify-between px-6 border-2 p-2 rounded-xl bg-purple-600 " >
//         <h3 className="w-1/5">Employee Name</h3>
//               <h3 className="w-1/5">New Task</h3>
//               <h3 className="w-1/5">Active Task</h3>
//               <h3 className="w-1/5">Completed</h3> 
//               <h3 className="w-1/5">Failed</h3> 
//         </div>
//         {data&& data.map((item,idx ) => {
//           // console.log(item, item.username, item.taskCount.newTasks) ; 
//           return (
//             <div id = {idx} className="flex  justify-between px-6 text-xl border-2 p-2 rounded-xl  ">
//               <h2 className="w-1/5"   >{item.username}</h2>
//               <h3 className="w-1/5"  >{item.taskCount.newTasks}</h3>
//               <h3 className="w-1/5" >{item.taskCount.activeTasks}</h3>
//               <h3 className="w-1/5" >{item.taskCount.completedTasks}</h3> 
//               <h3 className="w-1/5" >{item.taskCount.failedTasks}</h3> 
//             </div> 
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AllTask;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
;
import { ThemeContext } from '../../Context/AppContext'
import { useNavigate } from "react-router";
const AllTask = () => {
  const [filter_text, setfilter_text] = useState("") 
  const navigate = useNavigate() ;
    const {theme, updated_data} = useContext(ThemeContext) ;
  const [data, setData] = useState([]); // Initialize as an array

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`https://ems-1-66zd.onrender.com/employee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      setData(response.data);
    } catch (error) {
      // console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {

    fetchTasks();
  }, [updated_data]);
   
  return (
    <div className= {` ${theme}   rounded-lg  overflow-x-hidden`}>
      <div className="m-4 flex flex-col gap-2 pt-2">
        <h1 className="font-bold pl-2 pr-2 pb-3 text-3xl">Click on the Employee's username to view their performance.</h1>
        

        <input type="text" placeholder="Search by username" 
        className="p-2 border rounded w-full md:w-1/3 mb-4 placeholder-gray-500 outline-none"
        value = {filter_text}
        onChange={(e) => {setfilter_text(e.target.value.trim().toLowerCase());
          console.log(filter_text) ;
         }}
        />
        
        
        
        <div className="flex text-xs md:text-xl justify-between  lg:px-6 border-2 p-2 rounded-xl bg-purple-600">
          <h3 className="w-1/5">Employee username</h3>
          <h3 className="w-1/5">New Task</h3>
          <h3 className="w-1/5">Active Task</h3>
          <h3 className="w-1/5 hidden sm:flex">Completed</h3>
          <h3 className="w-1/5"> Failed</h3>
        </div>

        

        {data.length > 0 ? (
          data.filter((item) =>{
            return filter_text === "" || item.username.toLowerCase().includes(filter_text)
          }).
          map((item, idx) => (
           <div key={idx} className="flex justify-between px-6 text-sm md:text-xl border-2 p-3 rounded-xl">
              <h2 className="w-2/5 sm:w-1/5 text-xs md:text-xl" onClick={()=>{
                 navigate("/chart", {
      state: { item },
    });
              }}  >{item.username}</h2>
      <h3 className="w-1/5 ">{item.taskCount?.newTasks ?? 0}</h3>
      <h3 className="w-1/5">{item.taskCount?.activeTasks ?? 0}</h3>
      <h3 className="w-1/5  hidden sm:flex">{item.taskCount?.completedTasks ?? 0}</h3>
      <h3 className="w-1/5">{item.taskCount?.failedTasks ?? 0}</h3>
            </div>
          ))
        ) : (
          <p className="text-center  mt-4">No Employee available</p>
        )}
      </div>
    </div>
  );
};

export default AllTask;

