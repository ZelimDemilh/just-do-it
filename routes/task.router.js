const {Router} = require("express")
const { taskController } = require("../controllers/task.controller")

const router = Router()

router.post("/add", taskController.addTask)
router.get("/", taskController.getAllTask)
router.get("/:id", taskController.getTaskById)
router.delete("/remove/:id", taskController.removeTask)

module.exports = router