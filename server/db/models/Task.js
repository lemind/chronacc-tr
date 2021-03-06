const mongoose = require('mongoose')

let TaskSchema = new mongoose.Schema(
  {
    description: String,
    beginTime: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    authUserEmail: String,
    periods: Array,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ]
  },{
    timestamps: true
  }
);

// ToDo: reconsider
TaskSchema.methods.addPeriod = function(period) {
  this.periods.push(period)
  return this.save()
}

TaskSchema.methods.addTag = function(tag) {
  this.tags.push(tag)
  return this.save()
}

module.exports = mongoose.model('Task', TaskSchema)
