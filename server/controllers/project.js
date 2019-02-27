const async = require("async")

const Project = require('./../models/Project')
const Task = require('./../models/Task')
const dbHelper = require('./../helpers/db')

module.exports = {
  getProjects: (req, res, next) => {
    if (!dbHelper.isDbReady()) {
      res.json({ success: false, error: 'db connection error' });
    }

    Project.find({}, (err, projects) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ result: projects, success: true });
    })
  },
  addProject: (req, res, next) => {
    const { name, color } = req.body

    new Project({ name, color }).save((err, project) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ result: project, success: true });
    })

  },
  updateProject: (req, res, next) => {
    const { _id, name, color } = req.body

    Project.findOneAndUpdate({ _id },
      {
        name,
        color
      },
      { new: true },
      (err, project) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ result: project, success: true });
      }
    )
  },
  deleteProject: async (req, res, next) => {
    const id = req.params.projectId

    async.parallel({
      delete: function(callback) {
        Project.findOneAndDelete({ _id: id },
          (err, res) => {
            callback(err, res);
          }
        )
      },
      ordersUpdate: function(callback) {
        Task.update(
          { project: id },
          { project: null },
          (err, res) => {
            callback(err, res);
          }
        )
      }
    }, function(err, results) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, results });
    });
  }
}
