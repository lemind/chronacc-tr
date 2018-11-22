import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createEpicMiddleware } from 'redux-observable';
import { combineReducers } from 'redux';
// persist
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

import Task from 'models/Task'
//

import styles from './app.less';

import { Starter } from './components/Starter/Starter';

import { rootReducer, rootEpic } from './redux/root';

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
  persistedReducer,
  middleware
)
let persistor = persistStore(store)

const renderApp = () => (
  render(
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <div className="container">
          <Starter />
        </div>
      </PersistGate>
    </Provider>,
    document.getElementById('app')
  )
);

renderApp();