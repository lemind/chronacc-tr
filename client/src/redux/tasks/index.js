import { actions } from './tasks.actions'
import { reducer } from './tasks.reducer'
import { tasksEpics } from './tasks.epics'
import { gatewayFactory } from 'helpers/gateway'
import Gateway from 'src/redux/Gateway'


export {
  actions as tasksActions,
  reducer as tasksReducer,
  tasksEpics,
}

export class TasksGateway extends Gateway {
  updateTask(task){
    this.dispatch(actions.updateTask(task))
  }

  addTask(newTask){
    this.dispatch(actions.addTask(newTask))
  }

  deleteTask(taskId){
    this.dispatch(actions.deleteTask(taskId))
  }

  load(init){
    if (init) {
      init.reset && this.dispatch(actions.clearTasks())
    }

    const params = {}

    const tasksList = this.state.tasks.list
    if (tasksList.length > 0) {
      params.lastId = tasksList[tasksList.length - 1]._id
    }

    this.dispatch(actions.fetchTasks({ ...params }))
  }

  serverDataPrepared(tasks){
    this.dispatch(actions.serverTasksPrepared(tasks))
  }
}

export default gatewayFactory(TasksGateway)
