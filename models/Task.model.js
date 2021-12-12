const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
  header: String,
  description: String,
  price: Number,
  location: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
