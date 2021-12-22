const User = require("../models/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find()

      res.json(users)
    } catch (e) {
      res.json(e)
    }
  },

  registration: async (req, res) => {
    try {
      const { login, password, firstName, lastName, email, phone, isMaster } =
        req.body

      const candidate = await User.findOne({ login })

      if (candidate) {
        return res.status(400).json({ error: "Имя пользователя занято" })
      }

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      )

      await User.create({
        login,
        password: hash,
        firstName,
        lastName,
        email,
        phone,
        isMaster,
      })

      res.json("Пользователь зарегистрирован")
    } catch (error) {
      res.status(400).json({ error: `Ошибка регистрации: ${error.toString()}` })
    }
  },
  uploadUser: async (req, res) => {
    try{
      const { login, password, firstName, lastName, email, phone, isMaster } = req.body

      const {authorization} = req.headers

      const [type, token] = authorization.split(" ")

      const payload = await jwt.verify(token, process.env.SECRET_JWT_KEY)

      const newDateUser = await User.findByIdAndUpdate(payload.id, {
        firstName,
        lastName,
        img: req.file.path
      })

      res.json({message: "изменения прошли успешно"})

    }catch (e) {
      res.json({error: "ошибка при изменении профиля" + e})
    }
  },
  login: async (req, res) => {
    try {
      const { login, password } = req.body

      const candidate = await User.findOne({ login })

      if (!candidate) {
        return res.status(401).json({ error: "Неверный логин" })
      }

      const valid = await bcrypt.compare(password, candidate.password)

      if (!valid) {
        return res.status(401).json({ error: "Неверный пароль" })
      }

      const payload = {
        id: candidate._id,
      }

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      })

      res.json({ token })
    } catch (e) {
      res.status(401).json({ error: "Ошибка авторизации" })
    }
  },
  getUserById: async (req ,res) => {
    try {
      const user = await User.findById(req.params.id)
      res.json(user)
    } catch (e) {
      res.status(401).json({error:'Ошибка получения данных'})
    }
  },
  pathUser: async (req, res) => {
    try{
      const { id } = req.params

      const { path } = req.file

      console.log(req.file);

      const user = await User.findByIdAndUpdate(id, {
        avatar: path
      })

      res.json({message: "аватар изменен", path: req.file.path})
    }catch (e) {
      res.status(401).json({error:'Ошибка получения данных'+ e})
    }
  }
}
