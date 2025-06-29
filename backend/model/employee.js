
const mongoose = require("mongoose");

// const counterSchema = new mongoose.Schema({
//   _id: { type: String, required: true }, // Identifier for the counter (e.g., "taskId")
//   seq: { type: Number, default: 1 } // Starting value of sequence
// });

// const Counter = mongoose.model("Counter", counterSchema);




const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt') ;
const employeeSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true,
        unique:true
    },
    username :{
        type:String,
        required:true,
        unique:true,
    },
    
    password:{
        type:String,
        required:true
    },tasks:[
        {  
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            date: {
                type : Date,
            },
            category: {
                type: String,
            },
            active: {
                type: Boolean,
            },
            newTask: {
                type: Boolean,
            },
            completed:{
                type:Boolean
            },
            failed: {
                type: Boolean,
            }
            ,assignedto:{
                type:String,
            }
            
        },
    ]
    , taskCount : {
        activeTasks :{
            type:Number ,
            default:0
        },
        completedTasks:{
            type:Number ,
            default:0
        },
        failedTasks:{
            type:Number ,
            default:0
        },
        newTasks :{
            type:Number ,
            default:0
        }

    }
    
})

// employeeSchema.pre("save", async function (next) {
//     if (!this.taskId) {
//       this.taskId = await getNextSequence("taskId");
//     }
//     next();
//   });
  



// employeeSchema.pre("save", async function (next) {
//     if (!this.taskId) {
//       const counter = await Counter.findByIdAndUpdate(
//         { _id: "taskId" }, // Find the counter for `taskId`
//         { $inc: { seq: 1 } }, // Increment `seq` by 1
//         { new: true, upsert: true } // Return the updated document, create if not exists
//       );
//       this.taskId = counter.seq;
//     }
//     next();
//   });


employeeSchema.pre('save' ,async function (next) {
    const employee = this ;
    if(!employee.isModified('password')){
        return next() ;
    }

    try{
        const salt = await bcrypt.genSalt(2) ;
        const hashedPassowrd = await bcrypt.hash(employee.password, salt) ;
        employee.password = hashedPassowrd ;
        next() ;
    }
    catch(err){
         return next(err) ;
    }
})

employeeSchema.methods.comparePassword = async function(password){

    try{
        const isMatch = await bcrypt.compare(password, this.password) ;
        return isMatch ;

    }catch(err){
        throw err ;
    }
}


const Employee = mongoose.model('Employee' ,employeeSchema) ;

module.exports = Employee ;