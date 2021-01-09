import Task from 'models/Task'
import { casesFactory } from 'helpers/case'
import Cases, { ICases, TFollowedStoreSchema } from './index'
import TasksGateway from 'src/redux/tasks'
import type { ITask, TInitTask } from 'models/Task'
import { IMongoId } from 'models/index'
import { IProject } from 'models/Project'
import AuthGateway from 'src/redux/auth'

export interface ITaskCases {
  updateTask(task: ITask): void
  deleteTask(taskId: IMongoId): void
  load(init?: any): void
  unsubscribe(): void
  startTask(task?: ITask): void
  stopActiveTask(): void
  bindProject(task: ITask, project: IProject | null): void
  getActiveTask(): ITask | null
}

export type ITasksCasesCommon = ITaskCases & ICases;

// ToDo: if all are business here?
// @withGateways(TasksGateway)
export class TasksCases extends Cases implements ITaskCases {
  setObservables(): TFollowedStoreSchema[] {
    return [{
      store: 'tasks',
      // ToDo: should we use consts?
      variables: ['list', 'hasMore', 'loading', 'error']
    }]
  }

  transformServerData(data: any): any {
    const { list, ...serverData } = data.tasks.serverData

    const clientList: ITask[] = []
    if (list && list.length > 0) {
      list.forEach(item => {
        clientList.push(new Task(item))
      })
    }

    return {
      list: clientList,
      ...serverData
    }
  }

  load(init?: any): void {
    const { tasksGateway } = this.gateways

    const props = this.setAuth({})

    this.loadFromGateways([
      {
        gateway: tasksGateway,
        params: {
          init,
          name: 'tasks',
          props: props,
        }
      }
    ])
  }

  unsubscribe(): void {
    const { tasksGateway } = this.gateways
    tasksGateway.unsubscribe()

    super.unsubscribe()
  }

  startTask(task?: ITask): void {
    let newTask
    const oldTask = task
    let isTaskCreated = false

    if (!task) {
      newTask = new Task()
      isTaskCreated = true
    } else {
      // do we need something to put logic of task creating?
      // some middle thing between cases and entity logic
      if (!task.hasStartedToday()) {
        const initTask: TInitTask = {
          description: task.description,
          project: task.project
        }

        newTask = new Task(initTask)
        isTaskCreated = true
      }
    }

    const activeTask = this.getActiveTask()
    activeTask && this.stopActiveTask()

    if (isTaskCreated) {
      newTask.start()
      this.createTask(newTask)
    } else if (oldTask) {
      oldTask.start()
      this.updateTask(oldTask)
    }
  }

  stopActiveTask(): void {
    const activeTask = this.getActiveTask()

    if (activeTask) {
      activeTask.stop()
      this.updateTask(activeTask)
    }
  }

  setAuth(task: ITask | any): ITask {
    const { authGateway } = this.gateways
    task.auth = {
      authUserEmail: authGateway.getAuthUserEmail()
    }
    return task
  }

  createTask(task: ITask): void {
    const { tasksGateway } = this.gateways

    task = this.setAuth(task)

    tasksGateway.createTask(task)
  }

  updateTask(task: ITask): void {
    const { tasksGateway } = this.gateways

    task = this.setAuth(task)

    tasksGateway.updateTask(task)
  }

  deleteTask(taskId: IMongoId): void {
    const { tasksGateway } = this.gateways
    tasksGateway.deleteTask(taskId)
  }

  getTaskById(id: IMongoId): ITask | undefined {
    const tasks = this.getTasks()
    return tasks.find(task => task._id === id)
  }

  getTasks(): ITask[]{
    const state = this.gateways.tasksGateway.store.getState()
    return state.tasks.list
  }

  getActiveTask(): ITask | null {
    const tasks = this.getTasks()
    const result = tasks.find(task => {
      if (task.isActive) {
        return task
      }
    })

    if (result) {
      return new Task(result)
    } else {
      return null
    }
  }

  bindProject(task: ITask, project: IProject | null): void {
    task.project = project

    const { tasksGateway } = this.gateways
    tasksGateway.updateTask(task)
  }

}

export default casesFactory(TasksCases, [TasksGateway, AuthGateway], 'TasksCases')
