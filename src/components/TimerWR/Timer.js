import React from 'react'
import moment from 'moment'

import { connect } from 'react-redux';

import Task from 'models/Task'
import TasksCases from 'src/redux/tasks'
import withCases from 'helpers/withCases'

import { tasksActions } from 'src/redux/tasks'

const SECOND = 1000

@withCases(TasksCases)
export class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskInProgress: false,
      time: null,
      timer: null
    }
  }

  toggleButton(){
    this.setState({
      taskInProgress: !this.state.taskInProgress
    })
  }

  //ToDo: is there nice start and startTimer fns
  start(){
    const { tasksCases } = this.props
    tasksCases.startTask()
    this.startTimer()
  }

  startTimer(){
    const { tasksCases } = this.props

    this.toggleButton()

    const startTime = this.props.tasksCases.getActiveTaskTime()

    const timer = setInterval(this.updateTimeCounter.bind(this, startTime), SECOND)
    this.setState({
      timer
    })
  }

  stop(){
    const { tasksCases } = this.props
    tasksCases.stopActiveTask()
    this.toggleButton()

    clearInterval(this.state.timer)
    this.setState({
      timer: null,
      time: null
    })
  }

  updateTimeCounter(startTime){
    const diff = moment().diff(moment(startTime))
    const time = startTime
      ? moment(diff).utc().format('HH:mm:ss')
      : ''
    this.setState({
      time
    })
  }

  updateTask(e){
    const activeTask = this.props.tasksCases.getActiveTask()
    activeTask.description = e.target.value
    this.props.tasksCases.updateTask(activeTask)
  }

  componentDidUpdate(prevProps, prevState) {
    const activeTask = this.props.tasksCases.getActiveTask()
    if (activeTask && !this.state.taskInProgress) {
      this.startTimer()
    }
  }

  render() {
    const time = this.state.time
    const activeTask = this.props.tasksCases.getActiveTask() || {}

    return (
      <div>
        <div>time: { time }</div>
        <br />
        <div>
          <input
            value={ activeTask.description || '' }
            onChange={ e => this.updateTask(e) }
            disabled={ !activeTask.id }
          />
        </div>
        <br />
        { !this.state.taskInProgress
          ? <button onClick={ () => this.start() }>Start</button>
          : <button onClick={ () => this.stop() }>Stop</button>
        }
      </div>
    )
  }
}
