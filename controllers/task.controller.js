const Task = require("../models/Task.model")
const User = require("../models/User.model")
const jwt = require("jsonwebtoken")
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports.taskController = {
    addTask: async (req, res) => {
        try {
            const {header, description, location, price} = req.body
            const {authorization} = req.headers

            const [type, token] = authorization.split(" ")

            if (type !== "Bearer") {
                return res.json({error: "Неправильный тип токена"})
            }

            const payload = await jwt.verify(token, process.env.SECRET_JWT_KEY)

            const newTask = Task.create({
                header,
                description,
                location,
                price,
                user: payload.id
            })
        } catch (e) {
            res.json({error: "Ошибка при создании задания"})
        }
    },
    removeTask: async (req, res) => {
        try {
            const { id } = req.params.id

            const { authorization } = req.headers

            const [type, token] = authorization.split(" ")

            const payload = await jwt.verify(token, process.env.SECRET_JWT_KEY)

            const user = await User.findById(payload.id)

            const task = await Task.findById(id)

            if (user._id !== task.user){
                return res.json({error: "Это не ваше задание, руки прочь"})
            }
            await Task.findByIdAndRemove(id)
            res.json("Успешно удалено")
        }catch (e) {
            res.json({error: "Ошибка при удалении"})
        }
    },
    getAllTask: async (req, res) => {
        try {
            const tasks = await Task.find()
            res.json(tasks)
        } catch (e) {
            res.json({error: "ошибка при получении данных заданий"})
        }
    },
    getTaskById: async (req, res) => {
        try {
            const {id} = req.params.id
            const task = await Task.findById()
            res.json(task)
        }catch (e) {
            res.json({error: "Ошибка при получении данных задания"})
        }
    },
    updateTask: async (req, res) => {
        try {

            const { id } = req.params.id

            const { header, description, location, price,} = req.body

            await Task.findByIdAndUpdate(id, {
                header,
                description,
                location,
                price
            })

            res.json("Изменения прошли успешно")

        } catch (e) {
            res.json({error: "Ошибка при изменении"})
        }
    }
}