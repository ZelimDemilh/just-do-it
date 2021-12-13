const mongoose = require("mongoose")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(morgan("Метод - :method, Статус - :status"))
app.use(express.json())
app.use(cors())
app.use(require('./routes'))
app.use('/uploads', express.static('uploads'))

mongoose.connect(process.env.MONGO_SERVER, )
    .then(()=>{
        console.log("Mongo connect")
        app.listen(port, ()=>{
            console.log("server start")
        })
    })
    .catch((error) =>{
        console.log("error connect Mongo")
    })