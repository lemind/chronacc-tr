import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'
import { combineEpics } from 'redux-observable'

import { tasksReducer, tasksEpics } from './tasks/index'
import { projectsReducer, projectsEpics, projectsActions } from './projects/index'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer
})

const RootAction = { projectsActions }

export type TRootAction = ActionType<typeof RootAction>;

export type TRootState = ReturnType<typeof rootReducer>

export const rootEpic = combineEpics(
  tasksEpics.fetchTasksEpic,
  tasksEpics.addTaskEpic,
  tasksEpics.updateTaskEpic,
  tasksEpics.deleteTaskEpic,
  ...projectsEpics
)
