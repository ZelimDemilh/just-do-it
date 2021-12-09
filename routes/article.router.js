const {Router} = require("express")
const {articlesController} = require('../controllers/articles.controller')

const router = Router()

router.get('/', articlesController.getArticles)
router.post('/add', articlesController.addArticle)
router.delete('/:id', articlesController.removeArticle)
router.patch('/:id', articlesController.editArticle)
router.get('/:id', articlesController.getOneArticle)

module.exports = router
