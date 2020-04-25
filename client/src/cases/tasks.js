import Task from 'models/Task'
import withGateways from 'helpers/withGateways'
import { casesFactory } from 'helpers/case'
import Cases from './index'
import TasksGateway from 'src/redux/tasks'

// ToDo: if all are business here?
@withGateways(TasksGateway)
export class TasksCases extends Cases {
  setObservables(){
    return [{
      store: 'tasks',
      variables: ['list', 'hasMore', 'loading', 'error']
    }]
  }

  transformServerData(data){
    const { list, ...serverData } = data.tasks.serverData

    const clientList = []
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

  load(init){
    const { tasksGateway } = this.gateways

    this.loadFromGateways([{ gateway: tasksGateway, params: { init, name: 'tasks' } }])
  }

  unsubscribe(){
    const { tasksGateway } = this.gateways
    tasksGateway.unsubscribe()

    super.unsubscribe()
  }

  startTask(task){
    const { tasksGateway } = this.gateways
    let newTask
    const oldTask = task
    let isTaskCreated = false

    if (!task) {
      newTask = new Task()
      isTaskCreated = true
    } else {
      if (!task.hasStartedToday()) {
        const initTask = {
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
      tasksGateway.createTask(newTask)
    } else {
      oldTask.start()
      tasksGateway.updateTask(oldTask)
    }
  }

  stopActiveTask(){
    const { tasksGateway } = this.gateways
    const activeTask = this.getActiveTask()

    if (activeTask) {
      activeTask.stop()
      tasksGateway.updateTask(activeTask)
    }
  }

  updateTask(task){
    const { tasksGateway } = this.gateways
    tasksGateway.updateTask(task)
  }

  deleteTask(taskId){
    const { tasksGateway } = this.gateways
    tasksGateway.deleteTask(taskId)
  }

  getTaskById(id){
    const tasks = this.state.tasks.list
    return tasks.find(task => task._id === id)
  }

  getTasks(){
    return this.gateways.tasksGateway.state.tasks.list
  }

  getActiveTask(){
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

  bindProject(task, project){
    task.project = project

    const { tasksGateway } = this.gateways
    tasksGateway.updateTask(task)
  }

}

export default casesFactory(TasksCases, [], 'TasksCases')
