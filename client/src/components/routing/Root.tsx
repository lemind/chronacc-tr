
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from 'components/common/blocks/Header/Header'

const Starter = lazy(() => import('components/home/Starter/Starter'));
const Projects = lazy(() => import('components/projects/Index/Projects'));

export default class Root extends React.Component {
  render() {
    return (<Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={ Starter } />
            <Route path="/projects" component={ Projects } />
          </Switch>
        </div>
      </Suspense>
    </Router>)
  }
}
