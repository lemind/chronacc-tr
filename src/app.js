import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { createEpicMiddleware } from 'redux-observable'
import { combineReducers } from 'redux'
// persist
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from 'src/redux/store'

import styles from './app.less'

import { Starter } from './components/Starter/Starter'
import Root from './components/routing/Root'

const renderApp = () => (
  render(
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <Root />
      </PersistGate>
    </Provider>,
    document.getElementById('app')
  )
);

renderApp();