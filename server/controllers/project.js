
const Project = require('./../models/Project')

module.exports = {
  getProjects: (req, res, next) => {
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
  deleteProject: (req, res, next) => {
    const id = req.params.projectId

    Project.findOneAndDelete({ _id: id },
      (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      }
    )
  }
}
