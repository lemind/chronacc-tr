import React from 'react'

import withCases from 'helpers/withCases'
import TasksCases from 'cases/tasks'
import Timer from 'components/home/Timer/Timer'
import Tasks from 'components/home/Tasks/Tasks'

@withCases(TasksCases)
export default class Starter extends React.Component {
  componentWillMount(){
    this.props.tasksCases.load({reset: true})
  }

  componentWillUnmount(){
    this.props.tasksCases.unsubscribe && this.props.tasksCases.unsubscribe()
  }

  render(){
    const tasks = this.props.tasks ? this.props.tasks.list : []

    return (
      <div>
        <div>
          <Timer />
        </div>
        <Tasks tasks={ tasks } />
      </div>
    )
  }
}

