const Category = require('../models/Category.model')

module.exports.categoriesController = {
  addCategory: async (req, res) => {
    try{
      const { name } = req.body

      const category = await Category.create({
        name: name
      })
      res.json(category)
    }catch (e) {
      res.json({error: "Ошибка при добавлении категории"})
    }
  },
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find()
      res.json(categories)
    }catch (e) {
      res.json({error: "Ошибка при выведении категории"})
    }
  },
  removeCategory: async (req, res) => {
    try{
     const {id} = req.params

     await Category.findByIdAndRemove(id)
      res.json("Категория успешно удалена")
    }catch (e) {
      res.json({error: "Ошибка при добавлении категории"})
    }
  },
  editCategory: async (req, res) => {
    try{
      const {name} = req.body

      await  Category.findByIdAndUpdate(req.params.id, {
        name: name
      })
      res.json("Категория успешно изменена")
    }catch (e) {
      res.json({error: "Ошибка при изменении категория"})
    }
  },
  getOneCategory: async (req, res) => {
    try{
      const {id} = req.params

      const category = await Category.findById(id)
      res.json(category)
    }catch (e) {
      res.json({error: "Ошибка при выведении одной категории"})
    }
  }
}
