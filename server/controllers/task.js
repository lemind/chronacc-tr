
const Task = require('./../models/Task')


module.exports = {
  getTasks: (req, res, next) => {
    Task.find({}, (err, tasks) => {
      return res.json({ result: tasks, success: true });
    })
  },
  addTask: (req, res, next) => {
    const { description, periods, tags, beginTime } = req.body

    saveTask({ description, beginTime, periods, tags })

    function saveTask(obj) {
      new Task(obj).save((err, task) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ result: task, success: true });
      })
    }
  },
  updateTask: (req, res, next) => {
    const { id, description, periods, tags, beginTime } = req.body

    Task.findByIdAndUpdate(id,
      {
        description, periods, tags, beginTime
      },
      { new: true },
      (err, task) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ result: task, success: true });
      }
    )
  },
  deleteTask: (req, res, next) => {
    const id = req.params.taskId

    Task.findByIdAndRemove(id,
      (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      }
    )
  }

}