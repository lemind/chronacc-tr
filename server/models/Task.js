const mongoose = require('mongoose')

let TaskSchema = new mongoose.Schema(
  {
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    periods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Period'
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ]
  }
);

TaskSchema.methods.addPeriod = function(period) {
  this.periods.push(period)
  return this.save()
}

TaskSchema.methods.addTag = function(tag) {
  this.tags.push(tag)
  return this.save()
}

module.exports = mongoose.model('Task', TaskSchema)