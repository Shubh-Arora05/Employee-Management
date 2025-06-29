// import React, { useEffect, useState } from "react";
// import AcceptTask from "./AcceptTask";
// import CompleteTask from "./CompleteTask";
// import FailedTask from "./FailedTask";
// import axios from "axios";
// import NewTask from "./NewTask";
// import { useParams } from "react-router";

// let d ;

// const TaskList = () => {

//   const _id = useParams() ;

//   const [data,setdata] = useState([]) ; 

//   const func = async () =>{

//     //console.log(_id.id) ;

//     const response = await axios.get(`https://ems-hm43.onrender.com/employee/${_id.id}` , {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }      
//     }) ;

//     //console.log("response" , response ) ;
//     d = response.data;

//     setdata(response.data) ;
//   }

//   useEffect(() =>{
//     func() ;
//   },[])

//   //console.log("task data ", data.tasks);
//   return (
//     <div>
//       <div
//         id="tasklist"
//         className=" w-full flex  overflow-x-auto  mt-10 justify-start text-center items-center flex-nowrap p-6 gap-5 h-[55%]"
//       >
//         { data.tasks ? data.tasks.map((item , id) => {
//           // //console.log(item) ;
//           if (item.active) {
//             return (<AcceptTask id = {_id} taskId={item.taskId}  key = {id } idx = {id} data = {data}  main_data = {item}  setdata = {setdata} ></AcceptTask>)
//           } else if (item.completed) {
//             return (<CompleteTask  key = {id}  data = {item} ></CompleteTask>)
//           } else if (item.failed) {
//             return (<FailedTask key = {id}  data = {item} ></FailedTask>)
//           } else if (item.newTask) {
//             return (<NewTask id = {_id} taskId = {item.taskId} key = {id} idx = {id} data = {data} main_data = {item} setdata = {setdata} ></NewTask>)
//           }
//         } ) :""}

//       </div>
//       { (data.tasks.empty) &&


//       <h1 className="text-3xl text-center  p-6 m-2 font-bold flex justify-center items-center">No tasks available</h1>
    
//       }
//       </div>
//   );
// };

// export default TaskList;


import React, { useContext, useEffect, useState } from "react";
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import axios from "axios";
import { ThemeContext } from "../../Context/AppContext";
import NewTask from "./NewTask";
import { useParams } from "react-router";

const TaskList = () => {
   const { theme, settheme } = useContext(ThemeContext);
  const { id } = useParams(); // Extract `id` directly
  const [data, setData] = useState({ tasks: [] }); // Ensure `tasks` is always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://ems-1-66zd.onrender.com/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(response.data);
    } catch (err) {
      // //console.error("Error fetching tasks:", err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id, setData]); // Refetch when `id` changes

  if (loading) return <h1 className="text-center text-2xl">Loading...</h1>;
  if (error) return <h1 className="text-center text-red-500">{error}</h1>;

  return (
    <div className = {`${theme}  overflow-x-hidden   `} >

      <div  className="   grid grid-cols-1  overflow-x-hidden sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10   p-6">
        {data.tasks.length > 0 ? (
          data.tasks.map((item, idx) => {
            if (item.active) {
              return <AcceptTask key={idx} id={id} taskId={item.taskId} data={data} main_data={item} index = {idx} setdata={setData} />;
            } else if (item.completed) {
              return <CompleteTask key={idx} data={item} />;
            } else if (item.failed) {
              return <FailedTask key={idx} data={item} />;
            } else if (item.newTask) {
              return <NewTask key={idx} id={id} taskId={item.taskId}  data={data} main_data={item} index = {idx} setdata={setData} />;
            }
            return null;
          })
        ) : (
          <h1 className="text-3xl text-center p-6 m-2 font-bold flex justify-center items-center">No tasks available</h1>
        )}
      </div>
    </div>
  );
};

export default TaskList;

