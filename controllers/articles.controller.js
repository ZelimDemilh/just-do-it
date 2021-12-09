const Article = require('../models/Article.model')

module.exports.articlesController = {
  addArticle: async (req, res) => {
    try{
      const {header, text} = req.body

      const article = await Article.create({
      header: header,
      text: text,
      image: req.body.image
      //image нужно будет поменять
    })
      res.json(article)
    }catch (e) {
      res.json({error: "Ошибка про добавлении"})
    }
  },
  getArticles: async (req, res) => {
    try{
      const articles = await Article.find()
      res.json(articles)
    }catch (e) {
      res.json({error: "Ошибка при выведении статей"})
    }
  },
  removeArticle: async (req, res) => {
    try{
      await Article.findByIdAndRemove(req.params.id)
      res.json("Успешное удаление")
    }catch (e) {
      res.json({error: "Ошибка при удалении статьи"})
    }
  },
  editArticle: async (req, res) => {
    try{
      const {header, text} = req.body

      const article = await Article.findByIdAndUpdate(req.params.id, {
        header: header,
        text: text
      })
      res.json(article)
    }catch (e) {
      res.json({error: "Ошибка при изменении статьи"})
    }
  },
  getOneArticle: async (req, res) => {
    try{
      const article = await Article.findById(req.params.id)
      res.json(article)
    }catch (e) {
      res.json({error: "Ошибка при выведении одной статьи"})
    }
  }
}
