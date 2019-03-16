import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable';
import { combineReducers } from 'redux';
// persist
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import Task from 'models/Task'
//

import { rootReducer, rootEpic } from 'src/redux/root';

const epicMiddleware = createEpicMiddleware(rootEpic);

// process.env.NODE_ENV

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = composeEnhancers(applyMiddleware(epicMiddleware));

// dev temp store persist
const SetTransform = createTransform(
  (inboundState, key) => {
    return { ...inboundState }
  },
  (outboundState, key) => {
    if (key === 'tasks') {
      outboundState.list = outboundState.list.map(item => {
        return new Task(item)
      })
    }

    return { ...outboundState }
  },
)
//

const persistConfig = {
  key: 'root',
  storage,
  transforms: [SetTransform]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  // persistedReducer,
  rootReducer,
  middleware
)
// export const persistor = persistStore(store)
