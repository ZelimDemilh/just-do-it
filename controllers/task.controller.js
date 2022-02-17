const Task = require("../models/Task.model")
const User = require("../models/User.model")
const jwt = require("jsonwebtoken")
const multer = require("multer");
const upload = multer({ dest: "uploads/" })

module.exports.taskController = {
  addTask: async (req, res) => {
    try {
      const { header, description, category, latitude, longitude, price } = req.body

      const newTask = await Task.create({
        header,
        description,
        category,
        latitude,
        longitude,
        price,
        user: req.user.id,
        executor: null
      })

      res.json(newTask)
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
      const { id } = req.params
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
  addCandidate: async (req, res) => {
  try {
    const candidate = req.user.id
    const { id } = req.params

    const task = await Task.findById(id)

    console.log(req.user.id)

    if (!task.candidates.indexOf(candidate)){
      return res.json({error: "Вы уже откликнулись"})
    }

    if(task.executor){
      return res.json({error: "Задание уже начато"})
    }

    task.candidates.push(candidate)
    task.save()
    res.json({message: "Вы откликнулись"})
  }catch (e) {
    res.json({error: "Ошибка при отклике"})
  }
  },
  addExecutor: async (req, res) => {
    try {
      const { idUser } = req.body
      const { id } = req.params

      await Task.findByIdAndUpdate(id, { executor: idUser, status: 1, candidates: [] })

      res.json({message: "Вы выбрали исполнителя"})
    } catch (e) {
      res.json({error: "Ошибка при выборе исполнителя"})
    }
  },
  completeTask: async (req, res) => {
    try{
      const { id } = req.params

      await Task.findByIdAndUpdate(id, { executor: null, status: 3 })

      res.json({message: "Задание завершено"})
    }catch (e) {
      res.json({error: "Ошибка при завершении задании"})
    }
  }
}




