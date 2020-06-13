import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { store } from 'src/redux/store'

import Root from './components/routing/Root'

const renderApp = () => (
  render(
    <Provider store={ store }>
      <Root />
    </Provider>,
    document.getElementById('app')
  )
);

renderApp()
