import Task from 'models/Task'
import withGateways from 'helpers/withGateways'
import { caseFactory } from 'helpers/case'
import Cases from './index'
import TasksGateway from 'src/redux/tasks'

@withGateways(TasksGateway)
export class TasksCases extends Cases {
  setObservables(){
    return [{store: 'tasks', variables: ['list']}]
  }

  startTask(task){
    const { tasksGateway } = this.gateways
    const newTask = task ? task : new Task()

    const activeTask = this.getActiveTask()
    activeTask && this.stopActiveTask()

    newTask.start();

    if (task) {
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

  getTaskById(id){
    const tasks = this.state.tasks.list
    return tasks.find(task => task.id === id)
  }

  getTasks(){
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

}

export default caseFactory(TasksCases, 'TasksCases')
