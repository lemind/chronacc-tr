
const Task = require('./../db/models/Task')
const Project = require('./../db/models/Project')
const dbHelper = require('./../helpers/db')
const errorsHelper = require('./../helpers/errors')

const createProject = async (name, color) => {
  const project = new Project({ name, color })
  const newProject = await project.save()
  return newProject
}

const NUMBER_ITEMS_PER_LOAD = 20

// errors
// 1 - db connection
// common
// entities
// 1* - tasks
// 2* - projects
// actions
// *0 - fetch
// *1 - add
// *2 - edit
// *3 - delete

module.exports = {
  getTasks: (req, res, next) => {
    if (!dbHelper.isDbReady()) {
      const errorParams = {
        id: 1,
        message: 'DB connection error'
      };
      const error = errorsHelper.handleError(errorParams);
      res.json({ success: false, error });
      return;
    }

    let condition = {}

    if (req.query.lastId) {
      condition = {
        '_id': { $lt: req.query.lastId },
      }
    }

    if (req.query.authUserEmail) {
      condition.authUserEmail = { $eq: req.query.authUserEmail }
    } else {
      condition.authUserEmail = { $exists: false }
    }

    Task.find(condition)
      .limit(NUMBER_ITEMS_PER_LOAD)
      .sort( '-_id' )
      .populate({ path: 'project' })
      .exec((err, tasks) => {

        if (err) {
          const errorParams = {
            id: 10,
            message: 'Getting task error'
          };
          const error = errorsHelper.handleError(errorParams, err);
          res.json({ success: false, error });
          return
        }

        return res.json({
          result: {
            list: tasks,
            hasMore: tasks.length === NUMBER_ITEMS_PER_LOAD
          },
          success: true
        });
      })
  },
  addTask: (req, res, next) => {
    const { description, periods, tags, beginTime, project, auth } = req.body

    const newTask = { description, beginTime, periods, tags, project }

    const authUserEmail = auth && auth.authUserEmail
    if (authUserEmail) {
      newTask.authUserEmail = authUserEmail
    }

    new Task(newTask)
      .save( async (err, task) => {
        if (err) {
          const errorParams = {
            id: 11,
            message: 'Adding task error'
          };
          const error = errorsHelper.handleError(errorParams, err);
          res.json({ success: false, error });
          return
        }

        await Task.populate(task, { path: 'project' })

        return res.json({ result: task, success: true });
      })
  },
  updateTask: async (req, res, next) => {
    const { _id, description, periods, tags, beginTime, auth } = req.body

    let { project } = req.body
    if (project && project.isNew){
      try {
        project = await createProject(project.name, project.color)
      } catch(err){
        const errorParams = {
          id: 21,
          message: 'Creating project error'
        };
        const error = errorsHelper.handleError(errorParams, err);
        res.json({ success: false, error });
        return;
      }
    }

    const newTask = { description, periods, tags, beginTime }

    if (auth && auth.authUserEmail) {
      newTask.authUserEmail = authUserEmail
    }
    if (project && project._id) {
      newTask.project = project._id
    }

    Task.findOneAndUpdate( { _id: _id },
      newTask,
      { new: true },
      async (err, task) => {
        if (err) {
          const errorParams = {
            id: 12,
            message: 'Updating task error'
          };
          const error = errorsHelper.handleError(errorParams, err);
          res.json({ success: false, error });
          return
        }

        await Task.populate(task, { path: 'project' })

        return res.json({ result: task, success: true });
      }
    )
  },
  deleteTask: (req, res, next) => {
    const id = req.params.taskId

    Task.findOneAndDelete({ _id: id },
      (err, results) => {
        if (err) {
          const errorParams = {
            id: 13,
            message: 'Deleting task error'
          };
          const error = errorsHelper.handleError(errorParams, err);
          res.json({ success: false, error });
          return
        }
        return res.json({ success: true, results });
      }
    )
  }

}