import React from 'react'
import moment from 'moment'
import CreatableSelect from 'react-select/lib/Creatable'

import withCases from 'helpers/withCases'
import TasksCases from 'cases/tasks'
import ProjectsCases from 'cases/projects'
import { makeOptionsFromItem } from 'helpers/select'

const SECOND = 1000
const TIME_FORMAT = 'HH:mm:ss'

@withCases(TasksCases, ProjectsCases)
export default class Timer extends React.Component {
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

  start(){
    const { tasksCases } = this.props
    tasksCases.startTask()

    this.timerStart()
  }

  timerStart(){
    const { tasksCases } = this.props

    const startTime = tasksCases.getActiveTaskTime()
    const activeTask = tasksCases.getActiveTask()

    if (!activeTask || this.state.timer) return

    const timer = setInterval(this.updateTimeCounter.bind(this, startTime), SECOND)

    this.showStopButton()

    this.setState({
      timer,
      activeTaskId: activeTask._id
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

  isTimerActive(){
    return this.state.timer
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

    this.props.projectsCases.load()
  }

  componentWillUnmount(){
    this.isTimerActive() && this.timerStop()
  }

  componentDidUpdate(prevProps, prevState) {
    const activeTask = this.props.tasksCases.getActiveTask()

    if (activeTask && activeTask._id !== this.state.activeTaskId) {
      if (prevState.activeTaskId) {
        this.timerStop()
      }

      this.timerStart()
    }
  }

  handleChangeProject(activeTask, optionProject){
    const project = {
      isNew: optionProject.__isNew__,
      _id: optionProject.value,
      name: optionProject.label
    }

    this.props.tasksCases.bindProject(activeTask, project)
  }

  getProjectsLikeOptions(){
    return this.props.projectsCases.getListLikeOptions()
  }

  render() {
    const time = this.state.time
    const activeTask = this.props.tasksCases.getActiveTask() || {}

    if (!activeTask) return;

    const options = this.getProjectsLikeOptions()

    return (
      <div>
        <div>time: { time }</div>
        <br />
        <div>
          <input
            value={ activeTask.description || '' }
            onChange={ e => this.updateTask(e) }
            disabled={ !activeTask._id }
          />
          <CreatableSelect
            isClearable
            name='project'
            value={ activeTask.project && makeOptionsFromItem(activeTask.project) }
            onChange={ (optionProject) => this.handleChangeProject(activeTask, optionProject) }
            options={ options }
            isDisabled={ !activeTask._id }
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
