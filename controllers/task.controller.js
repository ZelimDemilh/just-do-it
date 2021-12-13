const Task = require("../models/Task.model")
const User = require("../models/User.model")
const jwt = require("jsonwebtoken")
const multer = require("multer");
const upload = multer({ dest: "uploads/" })

module.exports.taskController = {
  addTask: async (req, res) => {
    try {
      const { header, description, location, price } = req.body

      const newTask = await Task.create({
        header,
        description,
        location,
        price,
        user: req.user.id,
      })

      res.json("Задача успешно создана")
    } catch (e) {
      res.status(401).json({ error: "Ошибка при создании задачи" })
    }
  },

  removeTask: async (req, res) => {
    try {
      const { id } = req.params

      const task = await Task.findById(id)

      if (task.user.toString() !== req.user.id) {
        return res.json({ error: "Это не ваше задание, руки прочь" })
      }

      await Task.findByIdAndRemove(id)

      res.json("Успешно удалено")
    } catch (e) {
      res.json("Ошибка удаления: " + e.toString())
    }
  },

  getAllTask: async (req, res) => {
    try {
      const tasks = await Task.find()
      res.json(tasks)
    } catch (e) {
      res.json({ error: "ошибка при получении данных заданий" })
    }
  },
  getTaskById: async (req, res) => {
    try {
      const { id } = req.params.id
      const task = await Task.findById()
      res.json(task)
    } catch (e) {
      res.json({ error: "Ошибка при получении данных задания" })
    }
  },
  updateTask: async (req, res) => {
    try {
      const { id } = req.params.id

      const { header, description, location, price } = req.body

      await Task.findByIdAndUpdate(id, {
        header,
        description,
        location,
        price,
      })

      res.json("Изменения прошли успешно")
    } catch (e) {
      res.json({ error: "Ошибка при изменении" })
    }
  },
}
