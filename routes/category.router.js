const {Router} = require("express")
const { categoriesController } = require('../controllers/categories.controller')

const router = Router()

router.get('/', categoriesController.getCategories)
router.post('/add', categoriesController.addCategory)
router.delete('/remove/:id', categoriesController.removeCategory)
router.patch('/update/:id', categoriesController.editCategory)
router.get('/:id', categoriesController.getOneCategory)

module.exports = router
