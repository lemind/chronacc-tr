import { actions } from './tasks.actions'
import { reducer } from './tasks.reducer'
import { tasksEpics } from './tasks.epics'
import { gatewayFactory } from 'helpers/gateway'
import Task from 'models/Task'
import Gateway from 'src/redux/Gateway'


export {
  actions as tasksActions,
  reducer as tasksReducer,
  tasksEpics,
}

export class TasksGateway extends Gateway {
  constructor(...params){
    super(...params)
  }

  updateTask(task){
    this.dispatch(actions.updateTask(task))
  }

  addTask(newTask){
    this.dispatch(actions.addTask(newTask))
  }

  deleteTask(taskId){
    this.dispatch(actions.deleteTask(taskId))
  }

  load(){
    const last = this.state.tasks.list[this.state.tasks.list.length - 1]
    const lastId = last && last._id
    const params = {}
    if (lastId) {
      params.lastId = lastId
    }
    this.dispatch(actions.fetchTasks({ ...params }))
  }

  serverTasksPrepared(tasks){
    this.dispatch(actions.serverTasksPrepared(tasks))
  }
}

export default gatewayFactory(TasksGateway)
