const {Router} = require("express")
const {articlesController} = require('../controllers/articles.controller')

const router = Router()

router.get('/', articlesController.getArticles)
router.post('/add', articlesController.addArticle)
router.delete('/remove/:id', articlesController.removeArticle)
router.patch('/update/:id', articlesController.editArticle)
router.get('/:id', articlesController.getOneArticle)

module.exports = router
