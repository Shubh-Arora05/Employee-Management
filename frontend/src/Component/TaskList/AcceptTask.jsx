// import React from 'react'

// const AcceptTask = ({data}) => {
//     // console.log(data) ;
//   return (
//     <div>
//           <div className="bg-yellow-400 rounded-2xl h-[100%] p-5 flex-shrink-0  w-[300px]  flex flex-col gap-6 ">
//           <div className="flex justify-between p-2">
//             <h3 className="text-md text-white rounded-md font-bold bg-red-700  p-2">
//             {data.category}
//             </h3>
//             <h4 className="font-medium text-lg">{data.date}</h4>
//           </div>
//           <h2 className="font-medium text-xl">{data.title}</h2>

//           <p className="font-medium text-md">
//            {data.description}
//           </p>

//             <div className='flex gap-9'>
//           <button className='bg-green-400  rounded-xl p-2 '>Mark as Completed</button>

//           <button className='bg-red-600 rounded-xl p-2'>Mark as Failed</button>
//           </div>

//         </div>
//     </div>
//   )
// }

// export default AcceptTask



import React, { useEffect, useContext} from "react";
import axios from "axios";
import { format } from 'date-fns';
import { useSnackbar } from "notistack";
import { ThemeContext } from "../../Context/AppContext";
let updated_data = "";
const AcceptTask = ({ id, data, taskId, setdata, main_data, index }) => {

   const {enqueueSnackbar} = useSnackbar() ;
   const {updated_data,setupdated_data} = useContext(ThemeContext) ;
  // const cur_data = (item) =>{

  //   const options = { year: "numeric", month: "long", day: "numeric"} ;
  //   // console.log( "fdffn" ,response.data.createdAt) ;
  //   // Check if item.data is a valid date
  //   if (item.date instanceof Date && !isNaN(item.date)) {
  //     item.date = item.date.toLocaleDateString(undefined, options); // Format the date
  //   } else {
  //     console.error("Invalid date:", item.date);
  //     return null; // Or return some default value if needed
  //   }
  
  //   return item.date;
  
  // }
  
  

  // console.log(data);

  const handle_complete = async (e) => {

    e.preventDefault();

    // console.log("Before update:", data);

    // Create a copy to avoid modifying props directly
    let updatedData = { ...data, taskCount: { ...data.taskCount } };

    // Ensure taskCount exists and update values
    updatedData.taskCount.activeTasks = (updatedData.taskCount.activeTasks ?? 0) - 1;
    updatedData.taskCount.completedTasks =
      (updatedData.taskCount.completedTasks ?? 0) + 1;
    // console.log(updatedData.taskCount, index);
    updatedData.tasks[Number(index)].active = false;
    updatedData.tasks[Number(index)].completed = true;

    console.log("After update:", updatedData);

    try {
      let response = await axios.put(
        `https://ems-1-66zd.onrender.com/task/${id}/${index}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response) ;
      // alert("mmd");

      if (response.status === 200) {
        // alert("Task marked as completed!");

        // Update state instead of reloading
        setdata(updatedData);
        setupdated_data(updated_data + 1) ;
        // enqueueSnackbar('Successfully Login' , {variant : 'success'} ); 
      } else {
        // alert("Failed to update task.");
        // enqueueSnackbar('Successfully Login' , {variant : 'error'} ); 
      }

      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handle_failed = async (e) => {
    e.preventDefault();

    e.preventDefault();

    // console.log("Before update:", data);

    // Create a copy to avoid modifying props directly
    let updatedData = { ...data, taskCount: { ...data.taskCount } };

    // Ensure taskCount exists and update values
    updatedData.taskCount.activeTasks = (updatedData.taskCount.activeTasks ?? 0) - 1;
    updatedData.taskCount.failedTasks =
      (updatedData.taskCount.failedTasks ?? 0) + 1;
    // console.log(updatedData.tasks[3], idx);
    updatedData.tasks[Number(index)].active = false;
    updatedData.tasks[Number(index)].failed = true;

    console.log("After update:", updatedData);

    try {
      let response = await axios.put(
        `https://ems-1-66zd.onrender.com/task/${id}/${index}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
     

      if (response.status === 200) {
       
        // Update state instead of reloading
        setdata(updatedData);
        setupdated_data(updated_data + 1) ;
      } else {
        alert("Failed to update task.");
      }
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("id1", id1) ;
  // console.log("id2", id2) ;
  return (
    
    <div className="">
       
      <div className="bg-yellow-400  rounded-2xl p-5 flex-shrink-0    flex flex-col gap-2 ">
        <div className="flex flex-col justify-between p-2">
        <h1 className="text-center text-xl md:text-2xl  p-3">Active Task</h1>
          <h3 className="text-md w-fit text-white rounded-md font-bold bg-red-700  p-2">
            {main_data.category}
          </h3>
          <h4 className="font-medium text-xl">{ format(new Date(main_data.date), 'yyyy-MM-dd')}</h4>
        </div>
         <h2 className="font-medium text-3xl p-1">{main_data.title}</h2>

    <div className="font-medium text-md h-fit w-full break-words whitespace-pre-wrap overflow-x-hidden">
     {main_data.description}
    </div>

       

        <div className='flex gap-6'>
           <button className='bg-green-400  rounded-xl p-2 '  onClick={(e) => {
            handle_complete(e);
          }}>Mark as Completed</button>

           <button className='bg-red-600 rounded-xl p-2'  onClick={(e) => {
            handle_failed(e);
          }}>Mark as Failed</button>
          </div>
      </div>
    </div>
  );
};

export default AcceptTask;
