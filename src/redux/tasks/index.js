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
}

export default gatewayFactory(TasksGateway)