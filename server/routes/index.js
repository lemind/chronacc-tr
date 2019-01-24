
const task = require('./api/task')
const project = require('./api/project')

module.exports = (router) => {
  task(router)
  project(router)
}
