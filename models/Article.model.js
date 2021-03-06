const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  header: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  image: String
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
