const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    header: String,
    description: String,
    price: Number,
    category: {
        ref: "Category",
        type: mongoose.Schema.Types.ObjectId
    },
    latitude: String,
    longitude: String,
    status: {
        type: Number,
        default: 0
    },
    user: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
    },
    candidates: [{
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
    }],
    executor: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
    }
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
