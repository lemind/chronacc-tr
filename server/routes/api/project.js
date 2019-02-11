const projectController = require('./../../controllers/project')

module.exports = (router) => {
  router
    .route('/projects')
    .get(projectController.getProjects)

  router
    .route('/project')
    .post(projectController.addProject)

  router
    .route('/project')
    .put(projectController.updateProject)

  router
    .route('/project/:projectId')
    .delete(projectController.deleteProject)
}
