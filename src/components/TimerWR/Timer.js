import React from 'react'
import moment from 'moment'

import { connect } from 'react-redux';

import Task from 'models/Task'
import TasksCases from 'cases/tasks'
import withCases from 'helpers/withCases'

import { tasksActions } from 'src/redux/tasks'

const SECOND = 1000
const TIME_FORMAT = 'HH:mm:ss'

@withCases(TasksCases)
export class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskInProgress: false,
      time: null,
      timer: null,
      activeTaskId: null
    }
  }

  showStartButton(){
    this.setState({
      taskInProgress: false
    })
  }

  showStopButton(){
    this.setState({
      taskInProgress: true
    })
  }

  //ToDo: is there nice start and timerStart fns
  start(){
    const { tasksCases } = this.props
    tasksCases.startTask()
    this.timerStart()
  }

  timerStart(){
    const { tasksCases } = this.props

    const startTime = this.props.tasksCases.getActiveTaskTime()
    const activeTask = this.props.tasksCases.getActiveTask()

    this.showStopButton()

    const timer = setInterval(this.updateTimeCounter.bind(this, startTime), SECOND)

    this.setState({
      timer,
      activeTaskId: activeTask.id
    })
  }

  stop(){
    const { tasksCases } = this.props
    tasksCases.stopActiveTask()
    this.showStartButton()

    this.timerStop()
    this.setState({
      activeTaskId: null,
      taskInProgress: false
    })
  }

  timerStop(){
    clearInterval(this.state.timer)

    this.setState({
      timer: null,
      time: null
    })
  }

  updateTimeCounter(startTime){
    const diff = moment().diff(moment(startTime))
    const time = startTime
      ? moment(diff).utc().format(TIME_FORMAT)
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

  componentWillMount(){
    const activeTask = this.props.tasksCases.getActiveTask()
    if (activeTask && !this.state.taskInProgress) {
      this.timerStart()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const activeTask = this.props.tasksCases.getActiveTask()

    if (activeTask && activeTask.id !== this.state.activeTaskId) {
      if (prevState.activeTaskId) {
        this.timerStop()
      }
      this.timerStart()
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
