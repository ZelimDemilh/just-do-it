const {Router} = require("express")

const router = Router()

router.use("/users/", require("./user.router"))
router.use("/categories/", require("./category.router"))
router.use("/tasks/", require("./task.router"))

module.exports = router