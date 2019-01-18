const taskController = require('./../../controllers/task')

module.exports = (router) => {
  router
    .route('/tasks')
    .get(taskController.getTasks)

  router
    .route('/task')
    .post(taskController.addTask)

  router
    .route('/task')
    .put(taskController.updateTask)

  router
    .route('/task/:taskId')
    .delete(taskController.deleteTask)
}
