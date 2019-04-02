const mongoose = require('mongoose')

let ProjectSchema = new mongoose.Schema(
  {
    name: String,
    color: String
  }
)

module.exports = mongoose.model('Project', ProjectSchema)
