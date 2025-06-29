import React, { useContext, useEffect} from 'react'
import Header from '../Other/header'
import { Link, useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../Context/AppContext";
import TaskListNumber from '../Other/TaskListNumber'
import TaskList from '../TaskList/TaskList'
import { getLocalStorage } from '../../utils/localStorage';


const EmployeeDashboard = ({data}) => {

  const navigate = useNavigate();
 
   const {theme, updated_data} = useContext(ThemeContext) ;
  
    

  useEffect(() => {

    navigate(`/employee/${localStorage.getItem('employee_id')}`);
  }, [updated_data]);
  
    //  console.log("data in emp dashboard" , data, theme) ;
  return (
    
    <div className= {`p-3 ${theme} w-screen overflow-x-hidden h-screen `} >
        <Header data = {data} />
       
        <TaskListNumber data = {data} ></TaskListNumber>
        <TaskList data = {data} ></TaskList>
       
    </div>
  )
}

export default EmployeeDashboard

