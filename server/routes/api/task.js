const isAuth = require('../../middlewares/isAuth')
const taskController = require('./../../controllers/task')

module.exports = (router) => {
  router
    .route('/tasks')
    .get(taskController.getTasks)

  router
    .route('/task')
    .post(taskController.addTask)

  router
    .use(isAuth)
    .use(function (err, req, res, next) {
      if (err) {
        if (err.status === 401) {
          // return res.status(401).json({ success: false, error: err });
          next()
        } else {
          return res.status(500).json({ success: false, error: err });
        }
      } else {
        next()
      }
    })
    .route('/task')
    .put(taskController.updateTask)

  router
    .route('/task/:taskId')
    .delete(taskController.deleteTask)
}
