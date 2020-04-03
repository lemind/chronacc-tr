import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { rootReducer, rootEpic } from 'src/redux/root'

const epicMiddleware = createEpicMiddleware()

// process.env.NODE_ENV

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const middleware = composeEnhancers(applyMiddleware(epicMiddleware))

export const store = createStore(
  rootReducer,
  middleware
)

epicMiddleware.run(rootEpic)

// export type AppDispatch = typeof store.dispatch
