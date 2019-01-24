
const Project = require('./../models/Project')


module.exports = {
  getProjects: (req, res, next) => {
    Project.find({}, (err, projects) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ result: projects, success: true });
    })
  },
  addProject: (req, res, next) => {
    const { name } = req.body

    new Project({ name }).save((err, project) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ result: project, success: true });
    })

  },
  updateProject: (req, res, next) => {
    const { name } = req.body

    Project.findOneAndUpdate(id,
      {
        name
      },
      { new: true },
      (err, project) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ result: project, success: true });
      }
    )
  },
  deleteProject: (req, res, next) => {
    const id = req.params.projectId

    Project.findOneAndDelete(id,
      (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      }
    )
  }

}