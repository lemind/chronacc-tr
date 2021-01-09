import { ActionType } from 'typesafe-actions'

import actions, { fetchTasks, updateTask,
  deleteTask, createTask } from './tasks.actions'
import { reducer, ITasksState } from './tasks.reducer'
import tasksEpics from './tasks.epics'
import { gatewayFactory } from 'helpers/gateway'
import Gateway, { IGateway, TInitLoadData, TProps } from 'src/redux/Gateway'

import { IMongoId } from 'models/index'
import { ITask } from 'models/Task'

export type TaskActionType = ActionType<typeof actions>

const apiTasksActions = {fetchTasks, updateTask,
  deleteTask, createTask}

export type ApiTaskActionType = ActionType<typeof apiTasksActions>

export {
  actions as tasksActions,
  reducer as tasksReducer,
  tasksEpics,
}

export interface ITasksGateway {
  readonly myName: string
  readonly myState: ITasksState
  updateTask(task: ITask): void
  createTask(newTask: ITask): void
  deleteTask(taskId: IMongoId): void
  load(init: TInitLoadData, props: TProps): void
}

export type ITasksGatewayCommon = ITasksGateway & IGateway

export class TasksGateway extends Gateway implements ITasksGateway {
  get myName(): string {
    return 'tasks'
  }

  get myState(): ITasksState {
    return this.state[this.myName]
  }

  updateTask(task): void {
    this.dispatch(actions.updateTask.request(task))
  }

  createTask(newTask): void {
    this.dispatch(actions.createTask.request(newTask))
  }

  deleteTask(taskId): void {
    this.dispatch(actions.deleteTask.request(taskId))
  }

  load(init: TInitLoadData, props: TProps): void {
    if (this.myState.loading) return

    if (init) {
      init.reset && this.dispatch(actions.clearTasks())
    }

    // ToDo: extract
    const params: any = {
      authUserEmail: props?.auth && props.auth?.authUserEmail
    }

    const tasksList = this.state.tasks.list
    if (tasksList.length > 0 && !init.reset) {
      params.lastId = tasksList[tasksList.length - 1]._id
    }

    this.dispatch(actions.fetchTasks.request({ ...params }))
  }

  serverDataPrepared(tasks: any): void{
    this.dispatch(actions.serverTasksPrepared(tasks))
  }
}

export default gatewayFactory<ITasksGatewayCommon>(TasksGateway)
