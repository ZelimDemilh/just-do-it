const { Router } = require("express")
const { usersController } = require("../controllers/users.controller")
const upload = require('../middlewares/imageUser')

const router = Router()

router.post("/registration", usersController.registration) // Добавление пользователя
router.post("/login", usersController.login) // Отправление данных пользователя
router.get("/profile/:id",usersController.getUserById) // Получение данных пользователя
router.delete("/remove/:id") // Удаление пользователя
router.get("/", usersController.getAllUsers) // Вывод всех пользователей
router.post("/update/:id", upload.single("avatar"), usersController.pathUser) // Изменение аватара пользователя

module.exports = router
