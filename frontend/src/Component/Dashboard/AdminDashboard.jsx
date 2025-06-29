import React, { useContext, useEffect, useState } from 'react'
import Header from '../Other/header'
import CreateTask from '../Other/CreateTask'
import AllTask from '../Other/AllTask' 
import { ThemeContext } from '../../Context/AppContext'
const AdminDashboard = ({data}) => {
  const {theme, updated_data} = useContext(ThemeContext) ;
  useEffect(()=>{

  }, [updated_data] )

  return (
    <div  className = {`${theme}   w-screen h-screen   overflow-x-hidden`}>
        <Header data = {data}></Header>
        <CreateTask updated_data = {updated_data}></CreateTask>
        <AllTask updated_data = {updated_data}></AllTask>


    </div>
  )
}

export default AdminDashboard