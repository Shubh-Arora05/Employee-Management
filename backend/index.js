const express = require('express') ;
const mongoose = require('mongoose') ;
const app = express() ;
// require('dotenv').config() ;
const db = require('./db.js')
const cors = require('cors') ;

const port = 4000 ;
app.use(cors()) ;
const admin_routes = require('./routes/admin_routes.js')
const task_routes = require('./routes/task_routes.js')

const employee_routes = require('./routes/employee_routes.js')


app.use(express.json()); 


app.get('/' ,(req,res)=>{
    res.send('Radhe Krishna')
})
app.use('/admin' , admin_routes) ;
app.use('/task' , task_routes) ;
app.use('/employee' , employee_routes) ;

app.listen( port,()=>{
    console.log(`server is running on port ${port}`)
})