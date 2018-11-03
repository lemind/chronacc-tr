import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createEpicMiddleware } from 'redux-observable';
import { combineReducers } from 'redux';

import styles from './app.less';

import { Starter } from './components/Starter/Starter';

import { rootReducer, rootEpic } from './redux/root';

const epicMiddleware = createEpicMiddleware(rootEpic);

// process.env.NODE_ENV

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = composeEnhancers(applyMiddleware(epicMiddleware));

export const store = createStore(
  rootReducer,
  middleware
);

const renderApp = () => (
  render(
    <Provider store={ store }>
      <div className="container">
        <Starter />
      </div>
    </Provider>,
    document.getElementById('app')
  )
);

renderApp();