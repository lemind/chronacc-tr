import Task from 'models/Task'
import withGateways from 'helpers/withGateways'
import { caseFactory } from 'helpers/case'
import Cases from './index'
import TasksGateway from 'src/redux/tasks'
import { isObjectEmpty } from 'helpers/objects'

import 'rxjs/add/operator/map';

@withGateways(TasksGateway)
export class TasksCases extends Cases {
  constructor(props){
    super(props);

    this.states$

    this.subscribtions = []
  }

  setObservables(){
    return [{
      store: 'tasks',
      variables: ['list', 'hasMore', 'loading']
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
    tasksGateway.load(init)

    this.states$ = tasksGateway.getState$()

    const subscribtion = this.states$.subscribe(data => {
      if (!isObjectEmpty(data.tasks.serverData)) {
        const transformedData = this.transformServerData(data)

        tasksGateway.serverTasksPrepared(transformedData)
      }

      return data
    })

    this.subscribtions.push(subscribtion)
  }

  //ToDo: move to Cases
  unsubscribe(){
    const { tasksGateway } = this.gateways
    tasksGateway.unsubscribe()

    this.subscribtions.forEach(subscribtion => {
      subscribtion.unsubscribe()
    })
    this.subscribtions = []
  }

  startTask(task){
    const { tasksGateway } = this.gateways
    let newTask = task ? task : new Task()
    let createTask = false

    if (!task) {
      newTask = new Task()
      createTask = true
    } else {
      if (!task.hasStartedToday()) {
        const initTask = {
          description: task.description,
          project: task.project
        }

        newTask = new Task(initTask)
        createTask = true
      }
    }

    const activeTask = this.getActiveTask()
    activeTask && this.stopActiveTask()

    newTask.start();

    if (!createTask) {
      tasksGateway.updateTask(newTask)
    } else {
      tasksGateway.addTask(newTask)
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
    console.log('object', this.gateways);
    return this.gateways.tasksGateway.state.tasks.list
  }

  getActiveTask(){
    const tasks = this.getTasks()
    const result = tasks.find(task => {
      if (task.isActive()) {
        return task
      }
    })

    if (result) {
      return new Task(result)
    } else {
      return null
    }
  }

  getActiveTaskTime(){
    const activeTask = this.getActiveTask()

    return activeTask ? activeTask.getStartTime() : null
  }

  bindProject(task, project){
    task.project = project

    const { tasksGateway } = this.gateways
    tasksGateway.updateTask(task)
  }

}

export default caseFactory(TasksCases, 'TasksCases')
