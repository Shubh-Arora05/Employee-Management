
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  
 
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
  },
  newTask: {
    type: Boolean,
  },
  completed: {
    type: Boolean,
  },
  failed: {
    type: Boolean,
  },
  assignedto: {
    type: String,
  },
  _id: mongoose.Schema.Types.ObjectId,
});

// taskSchema.pre("save", async function (next) {
//   if (!this.taskId) {
//     this.taskId = await getNextSequence("taskId");
//   }
//   next();
// });


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
