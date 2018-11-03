import { actions } from './tasks.actions';
import { reducer } from './tasks.reducer';
import { tasksEpics } from './tasks.epics';
import { caseFactory } from "helpers/cases";
import Task from 'models/Task'
import Cases from 'src/redux/Cases';

export {
  actions as tasksActions,
  reducer as tasksReducer,
  tasksEpics,
}

const findTaskById = state => findTaskByIdSelector(state)

export class TasksCases extends Cases {
  startTask(task){
    const newTask = task || new Task()
    const activeTaskId = this.state.tasks.activeTaskId
    if (activeTaskId) {
      const activeTask = this.getTaskById(activeTaskId)
      activeTask.stop()
    }

    newTask.start();

    this.dispatch(actions.addTask(newTask))
    this.dispatch(actions.setActiveTask(newTask.id))
  }

  stopActiveTask(){
    const activeTaskId = this.state.tasks.activeTaskId
    const activeTask = this.getTaskById(activeTaskId)

    activeTask.stop()
    this.dispatch(actions.setActiveTask(null))
    this.dispatch(actions.updateTask(activeTask))
  }

  getTaskById(id){
    const tasks = this.state.tasks.list
    return tasks.find(task => task.id === id)
  }
}

export default caseFactory(TasksCases)