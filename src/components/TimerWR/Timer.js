import React from 'react'
import dayjs from 'dayjs'
import { connect } from 'react-redux';

import Task from 'models/Task'
import TasksCases from 'src/redux/tasks'
import withCases from 'helpers/withCases'

import { tasksActions } from 'src/redux/tasks'

@withCases(TasksCases)
export class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskInProgress: false
    }
  }

  toggleButton(){
    this.setState({
      taskInProgress: !this.state.taskInProgress
    })
  }

  start(){
    const { tasksCases } = this.props

    tasksCases.startTask()
    this.toggleButton()
  }

  stop(){
    const { tasksCases } = this.props
    tasksCases.stopActiveTask()
    this.toggleButton()
  }

  render() {
    const actionProps = {
      tasksCases: this.props.tasksCases
    }

    return (
      <div>
        <div>time here</div>
        { !this.state.taskInProgress
          ? <button onClick={ () => this.start() }>Start</button>
          : <button onClick={ () => this.stop() }>Stop</button>
        }
      </div>
    )
  }
}
