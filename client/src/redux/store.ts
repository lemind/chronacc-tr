import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { rootReducer, rootEpic } from 'src/redux/root'
import type { TRootAction, TRootState } from 'src/redux/root'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const epicMiddleware = createEpicMiddleware<
  TRootAction,
  TRootAction,
  TRootState
>()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = composeEnhancers(applyMiddleware(epicMiddleware))

export const store = createStore(
  rootReducer,
  middleware
)

epicMiddleware.run(rootEpic)

export type TAppStore = typeof store
export type TAppDispatch = typeof store.dispatch
