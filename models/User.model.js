const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  tasks: [
    {
      ref: "Task",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    required: false,
  },
  isMaster: {
    type: Boolean,
    default: true,
  },
})

const User = mongoose.model("User", userSchema)

module.exports = User
