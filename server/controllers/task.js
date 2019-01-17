
const Task = require('./../models/Task')


module.exports = {
  getTasks: (req, res, next) => {
    return res.json({ data: [{ id: 1, description: 'task' }], success: true });
  },
  addTask: (req, res, next) => {
    let { description, periods, tags, beginTime } = req.body

    saveTask({ description, beginTime, periods, tags })

    function saveTask(obj) {
      new Task(obj).save((err, task) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ result: task, success: true });
      })
    }
  }

}