import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'
import { combineEpics, Epic } from 'redux-observable'

import { tasksReducer, tasksEpics, tasksActions } from './tasks/index'
import { projectsReducer, projectsEpics, projectsActions } from './projects/index'
import { authReducer, authEpics, authActions } from './auth'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer,
  auth: authReducer
})

const RootAction = {
  tasksActions,
  projectsActions,
  authActions,
}

export type TRootAction = ActionType<typeof RootAction>;

export type TRootState = ReturnType<typeof rootReducer>

export type TRootEpic = Epic<TRootAction, TRootAction, TRootState>

export const rootEpic = combineEpics(
  ...tasksEpics,
  ...projectsEpics,
  ...authEpics,
)
