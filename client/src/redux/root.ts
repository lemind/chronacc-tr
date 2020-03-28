import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import { tasksReducer, tasksEpics } from './tasks/index'
import { projectsReducer, projectsEpics } from './projects/index'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const rootEpic = combineEpics(
  tasksEpics.fetchTasksEpic,
  tasksEpics.addTaskEpic,
  tasksEpics.updateTaskEpic,
  tasksEpics.deleteTaskEpic,
  projectsEpics.fetchProjectsEpic,
  projectsEpics.updateProjectEpic,
  projectsEpics.deleteProjectEpic,
  projectsEpics.addProjectEpic
)
