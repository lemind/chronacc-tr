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
    const newTask = task ? task : new Task()

    const activeTask = this.getActiveTask()
    activeTask && activeTask.stop()

    newTask.start();

    if (task) {
      this.dispatch(actions.updateTask(newTask))
    } else {
      this.dispatch(actions.addTask(newTask))
    }
  }

  stopActiveTask(){
    const activeTask = this.getActiveTask()

    if (activeTask) {
      activeTask.stop()
      this.dispatch(actions.updateTask(activeTask))
    }
  }

  updateTask(task){
    this.dispatch(actions.updateTask(task))
  }

  getTaskById(id){
    const tasks = this.state.tasks.list
    return tasks.find(task => task.id === id)
  }

  getActiveTask(){
    const tasks = this.state.tasks.list
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

    return activeTask ? activeTask.startTime : null
  }
}

export default caseFactory(TasksCases)