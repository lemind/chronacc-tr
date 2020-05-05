import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'
import { combineEpics, Epic } from 'redux-observable'

import { tasksReducer, tasksEpics, tasksActions } from './tasks/index'
import { projectsReducer, projectsEpics, projectsActions } from './projects/index'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer
})

const RootAction = { tasksActions, projectsActions }

export type TRootAction = ActionType<typeof RootAction>;

export type TRootState = ReturnType<typeof rootReducer>

export type TRootEpic = Epic<TRootAction, TRootAction, TRootState>

export const rootEpic = combineEpics(
  ...tasksEpics,
  ...projectsEpics,
)
