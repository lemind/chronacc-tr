import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createEpicMiddleware } from 'redux-observable';
import { combineReducers } from 'redux';

import styles from './app.less';

import { Starter } from './components/Starter/Starter';

import { rootReducer, rootEpic } from './redux/root';

const epicMiddleware = createEpicMiddleware(rootEpic);

const middleware = process.env.NODE_ENV
  ? applyMiddleware(epicMiddleware)
  : composeWithDevTools(
    applyMiddleware(epicMiddleware)
  );

const store = createStore(
  rootReducer,
  middleware
);

const renderApp = () => (
  render(
    <div className="container">
      <Starter />
    </div>,
    document.getElementById('app')
  )
);

renderApp();