const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    login: String,
    token: String,
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
      }
    ]
  }
)

module.exports = mongoose.model('User', UserSchema)
