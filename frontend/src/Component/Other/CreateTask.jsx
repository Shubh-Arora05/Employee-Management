import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../Context/AppContext";
const CreateTask = () => {
  const {updated_data,setupdated_data} = useContext(ThemeContext) ;
  const navigate = useNavigate() ;
  const [data, setdata] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
  });
  
 
  const {enqueueSnackbar} = useSnackbar() ;

  const [assignto, setassignto] = useState("");

  const handle_sumbit = async (e) => {
    e.preventDefault();

    //console.log(data);

    let obj = data;
  
    obj.completed = false;
    obj.failed = false;

    // //console.log(obj);

    const response = await axios.post(
      `https://ems-1-66zd.onrender.com/task/${assignto}`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 201) {
     
      enqueueSnackbar('Task Created Successfully' , {variant : 'success'} ); 
      // navigate('/admin') ;
      // navigate(0); 
      setupdated_data(updated_data+1) ;
      // window.location.reload();
    }
    
    
      // enqueueSnackbar('Failed' , {variant : 'error'} ); 

    

    // //console.log("jkjkkjdkkdklsklsdkllkds", response);

    setdata({
      title: "",
      description: "",
      date: "",
      category: "",
      newTask: false,
    });

    setassignto("");
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          handle_sumbit(e);
        }}
        className="flex overflow-x-hidden justify-between items-start border-2 rounded-xl m-5 p-5"
      >
        <div className="flex flex-col gap-6 w-1/2">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Task title</label>
            <input
            required
              value={data.title}
              onChange={(e) => {
                setdata((prev) => ({ ...prev, title: e.target.value }));
              }}
              type="text"
              className="outline-none placeholder-gray-500 border-2  p-2 rounded-xl"
              placeholder="Make a UI design"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Date</label>
            <input 
            required
              value={data.date}
              onChange={(e) => {
                setdata((prev) => ({ ...prev, date: e.target.value }));
              }}
              type="date"
              className="outline-none  placeholder-gray-800 border-2  p-2 rounded-xl"
              placeholder="dd/mm/yyyy"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Assign to</label>
            <input
            required
              value={assignto}
              onChange={(e) => {
                setassignto(e.target.value);
              }}
              type="text"
              className="outline-none placeholder-gray-500 border-2  p-2 rounded-xl"
              placeholder="employee username"
            />
          </div>

          {/* <div className="flex flex-col gap-1">
            <label htmlFor="">New Task</label>
            <input
              value={data.newTask}
              onChange={(e) => {
                setdata((prev) => ({ ...prev, newTask: e.target.value }));
              }}
              type="boolean"
              className="outline-none border-2  p-2 rounded-xl"
              placeholder="employee name"
            />
          </div> */}

          <div className="flex flex-col gap-1">
            <label htmlFor="">Category</label>
            <input
            required
              value={data.category}
              onChange={(e) => {
                setdata((prev) => ({ ...prev, category: e.target.value }));
              }}
              type="text"
              className="outline-none placeholder-gray-500 border-2  p-2 rounded-xl"
              placeholder="design, dev, etc"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 items-start w-2/5">
          <div className="flex items-center gap-5">
            <label htmlFor="newTask" className="text-xl">New Task</label>
            <input
            
              
             
              type="checkbox"
              checked={data.newTask} // Boolean value
              onChange={(e) => {
                setdata((prev) => ({ ...prev, newTask: !data.newTask }));
              }}
              className={`outline-none  border-2 p-2 rounded-xl scale-200`}
            />
          </div>
          <div className="w-full">
          <label htmlFor="">Description</label>

          <textarea
          required
            value={data.description}
            onChange={(e) => {
              setdata((prev) => ({ ...prev, description: e.target.value }));
            }}
            name=""
            id=""
            className=" mt-1 placeholder-gray-500 outline-none border-2 w-full h-44  p-2 rounded-xl"
          ></textarea>
          </div>

          <button
            type="Submit"
            className="outline-none border-2 w-full mt-4 text-md  bg-emerald-500 hover:bg-emerald-600 p-2 rounded-xl"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
