const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    header: String,
    description: String,
    price: String,
    location: String,
    user: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
    }
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task