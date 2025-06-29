const express = require("express");
const Task = require("../model/task"); // Task model
const Employee = require("../model/employee"); // Employee model
const {verify_token} = require('../jwt') ;

const router = express.Router();

// ✅ 1. Get all tasks
router.get("/",verify_token  ,async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
});

// ✅ 2. Get all tasks of one employee by Employee ID
router.get("/:employeeId",verify_token  ,async (req, res) => {
    try {
        const { employeeId } = req.params;
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(employee.tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
});

// ✅ 3. Create a new task for an employee
router.post("/:username",verify_token  ,async (req, res) => {
    try {
        const { username } = req.params;
        const { title, description, date, category, active, newTask, completed, failed } = req.body;

        const employee = await Employee.findOne({username:username});
        if (!employee) {
            return res.status(400).json({ message: "Employee not found" });
        }

        // console.log( "nfnfn", employee) ;

        // console.log( "employee.taskCount.newTasks",employee.taskCount.newTasks) ;
        // employee.updateOne
        if(newTask)
        employee.taskCount.newTasks =  employee.taskCount.newTasks + 1 ; 
        else
        employee.taskCount.activeTasks =  employee.taskCount.activeTasks + 1 ;
        // console.log( "employee.taskCount.newTasks",employee.taskCount.newTasks) ;

        await employee.save();

        let newTaskObj = new Task ({
            title,
            description,
            date,
            category,
            active: !newTask ,
            newTask: newTask ,
            completed: completed || false,
            failed: failed || false,
          
            

        });
        // console.log(newTaskObj.taskId) ;

        // console.log( "mfmdmmm newTaskObj"  ,newTaskObj) ;



        employee.tasks.push(newTaskObj);
        await employee.save();

        res.status(201).json({ message: "Task added successfully", task: newTaskObj });
    } catch (error) {
        // console.log(error) ;
        res.status(500).json({ message: "Error creating task", error });
    }
});


// router.put("/:employeeId/:taskId", verify_token, async (req, res) => {
//     try {
//         // console.log("Received update data:", req.body);
//         const { employeeId, taskId } = req.params;
//         const updateData = req.body;

//         const employee = await Employee.findById(employeeId);
//         if (!employee) {
//             return res.status(404).json({ message: "Employee not found" });
//         }
//         console.log(taskId) ;
//         // Find the task index

//         const  taskIndex = await Task.findOneAndUpdate({taskId}, {updateData}) ;
        
//         // const taskIndex = employee.tasks.findIndex(task => {task.taskId == taskId;
//         //     console.log(task.taskId) ;
//         // });

//         if (taskIndex === -1) {
//             return res.status(404).json({ message: "Task not found error" });
//         }
      
//         // Update the task
//         // Object.assign(employee.tasks[taskIndex], updateData);
//         await employee.save();
//         res.status(200).json(taskIndex) ;

//         // res.status(200).json({ message: "Task updated successfully", task: employee.tasks[taskIndex] });
//     } catch (error) {
//         console.log(error) ;
//         res.status(500).json({ message: "Error updating task", error: error.message });
//     }
// });

// ✅ 4. Update a task of an employee
router.put("/:employeeId/:taskId",verify_token  ,async (req, res) => {
    try {
        // console.log("fjedhd" , req.body) ;
        const { employeeId, taskId } = req.params;
        console.log(employeeId,taskId)
        const updateData = req.body;

        const employee = await Employee.findByIdAndUpdate(employeeId, req.body,{ new: true, runValidators: true });
        // Model.findByIdAndUpdate(id, update, { new: true, runValidators: true });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }


         let t  ;

        // for(let i = 0 ;i<employee.tasks.length ;i++){

        //      if(employee.tasks[i].taskId == taskId){
        //             t = employee.tasks[i] ;
        //             break ;
        //      }
        // }

        

        

        // // const task = employee.tasks.taskId(taskId);
        // console.log("hello" ,t) ;
        // if (t) {
        //     return res.status(404).json({ message: "Task not found" , t : t ,employee : employee});
        // }

        Object.assign(employee.tasks[taskId], updateData); // Update task fields
        await employee.save();

        res.status(200).json({ message: "Task updated successfully",  });
    } catch (error) {
        // console.log(error) ;
        res.status(500).json({ message: "Error updating task", error });
    }
});


router.get("/:employeeId/:taskId",verify_token  ,async (req, res) => {
    try {
       
        const { employeeId, taskId } = req.params;
       console.log( employeeId, taskId ) ;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // const t = await Task.findById(taskId);

        // console.log("tasks" , employee.tasks) ;
        let task ;

        for(let i = 0 ;i<employee.tasks.length ;i++){
            if(employee.tasks[i].taskId == taskId){
                // console.log("found") ;
              task =  employee.tasks[i] ;
            }
        }

      
        // console.log(task) ;

        if (!task) {
            return res.status(404).json({ message: "Task not found" , task : task });
        }


        // console.log(t) ;

        // if(t){
        //     return res.status(200).json({ message: "Task found successfully", task : t });
        // }

        return res.status(200).json({ message: "Task"});
    } catch (error) {
        // console.log(error) ;
        res.status(500).json({ message: "Error updating task", error });
    }
});
module.exports = router;
