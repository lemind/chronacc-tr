
const Task = require('./../models/Task')
const Project = require('./../models/Project')

const createProject = async (name) => {
  const project = new Project({ name })
  const newProject = await project.save()
  return newProject
}

module.exports = {
  getTasks: (req, res, next) => {
    Task.find({})
      .populate({ path: 'project' })
      .exec((err, tasks) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ result: tasks, success: true });
      })
  },
  addTask: (req, res, next) => {
    const { description, periods, tags, beginTime, project } = req.body

    new Task({ description, beginTime, periods, tags, project })
      .save( async (err, task) => {
        if (err) return res.json({ success: false, error: err });

        await Task.populate(task, { path: 'project' })

        return res.json({ result: task, success: true });
      })
  },
  updateTask: async (req, res, next) => {
    const { id, description, periods, tags, beginTime } = req.body

    let { project } = req.body
    if (project && project.isNew){
      try {
        project = await createProject(project.name)
      } catch(err){
        return res.json({ success: false, error: err });
      }
    }

    Task.findOneAndUpdate( { _id: id },
      {
        description, periods, tags, beginTime,
        project: project && project._id
      },
      { new: true },
      async (err, task) => {
        if (err) return res.json({ success: false, error: err });

        await Task.populate(task, { path: 'project' })

        return res.json({ result: task, success: true });
      }
    )
  },
  deleteTask: (req, res, next) => {
    const id = req.params.taskId

    Task.findOneAndDelete({ _id: id },
      (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      }
    )
  }

}