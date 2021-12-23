const { Router } = require("express")
const { taskController } = require("../controllers/task.controller")
const authMiddlewares = require("../middlewares/auth.middlewares")

const router = Router()

router.post("/add", authMiddlewares, taskController.addTask)
router.get("/", taskController.getAllTask)
router.get("/:id", taskController.getTaskById)
router.delete("/remove/:id", authMiddlewares, taskController.removeTask)
router.patch("/update/:id", authMiddlewares, taskController.updateTask)
router.patch("/respond/:id", authMiddlewares, taskController.addCandidate)
router.post("/executor/:id", authMiddlewares, taskController.addExecutor)
router.patch("/completeTask/:id", authMiddlewares, taskController.completeTask)

module.exports = router
