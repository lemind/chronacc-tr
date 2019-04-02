const async = require("async")

const Project = require('./../db/models/Project')
const Task = require('./../db/models/Task')
const dbHelper = require('./../helpers/db')
const errorsHelper = require('./../helpers/errors')

module.exports = {
  getProjects: (req, res, next) => {
    if (!dbHelper.isDbReady()) {
      const errorParams = {
        id: 1,
        message: 'DB connection error'
      };
      const error = errorsHelper.handleError(errorParams, err);
      res.json({ success: false, error });
      return;
    }

    Project.find({}, (err, projects) => {
      if (err) {
        const errorParams = {
          id: 20,
          message: 'Getting projects error'
        };
        const error = errorsHelper.handleError(errorParams, err);
        res.json({ success: false, error });
        return
      }

      return res.json({ result: projects, success: true });
    })
  },
  addProject: (req, res, next) => {
    const { name, color } = req.body

    new Project({ name, color }).save((err, project) => {
      if (err) {
        const errorParams = {
          id: 21,
          message: 'Creating project error'
        };
        const error = errorsHelper.handleError(errorParams, err);
        res.json({ success: false, error });
        return;
      }
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
        if (err) {
          const errorParams = {
            id: 22,
            message: 'Updating project error'
          };
          const error = errorsHelper.handleError(errorParams, err);
          res.json({ success: false, error });
          return;
        }
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
      if (err) {
        const errorParams = {
          id: 23,
          message: 'Deleting project error'
        };
        const error = errorsHelper.handleError(errorParams, err);
        res.json({ success: false, error });
        return;
      }
      return res.json({ success: true, results });
    });
  }
}
