const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    tasks: [{
        ref: "Task",
        type: mongoose.Schema.Types.ObjectId
    }],
    rating: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User