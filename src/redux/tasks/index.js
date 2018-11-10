import { actions } from './tasks.actions'
import { reducer } from './tasks.reducer'
import { tasksEpics } from './tasks.epics'
import { caseFactory } from "helpers/cases"
import Task from 'models/Task'
import Cases from 'src/redux/Cases'


export {
  actions as tasksActions,
  reducer as tasksReducer,
  tasksEpics,
}

export class TasksCases extends Cases {
  constructor(...params){
    super(...params)
  }

  setObservables(){
    return [{store: 'tasks', variables: ['list']}]
  }

  startTask(task){
    const newTask = task || new Task()

    const activeTask = this.getActiveTask()
    activeTask && activeTask.stop()

    newTask.start();

    this.dispatch(actions.addTask(newTask))
  }

  stopActiveTask(){
    const activeTask = this.getActiveTask()

    activeTask.stop()
    this.dispatch(actions.updateTask(activeTask))
  }

  getTaskById(id){
    const tasks = this.state.tasks.list
    return tasks.find(task => task.id === id)
  }

  getActiveTask(){
    const tasks = this.state.tasks.list
    return tasks.find(task => task.isActive)
  }

  getActiveTaskTime(){
    const activeTask = this.getActiveTask()

    let startTime = 0

    if (activeTask) {

      if (activeTask.periods.length) {
        startTime = activeTask.periods.reduce((acc, item) => {
          acc = acc + (item.endTime - item.beginTime)
          return acc
        }, 0)
      }

      startTime = activeTask.beginTime - startTime
    }

    if (!startTime) {
      return null
    }

    return startTime
  }
}

export default caseFactory(TasksCases)