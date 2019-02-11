
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Starter from 'components/home/Starter/Starter'
import Projects from 'components/projects/Index/Projects'
import Header from 'components/common/blocks/Header/Header'

export default class Root extends React.Component {

  render(){
    return (<Router>
      <div>
        <Header />

        <Route exact path="/" component={ Starter } />
        <Route path="/projects" component={ Projects } />
      </div>
    </Router>)
  }
}
