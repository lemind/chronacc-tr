import React from 'react'
import moment from 'moment'

import CreatableSelect from 'react-select/lib/Creatable'
import Select from 'react-select'

import Task from 'models/Task'
import TasksCases from 'cases/tasks'
import ProjectsCases from 'cases/projects'
import withCases from 'helpers/withCases'

import { tasksActions } from 'src/redux/tasks'

const SECOND = 1000
const TIME_FORMAT = 'HH:mm:ss'

@withCases(TasksCases, ProjectsCases)
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

  start(){
    const { tasksCases } = this.props
    tasksCases.startTask()

    this.timerStart()
  }

  timerStart(){
    const { tasksCases } = this.props

    const startTime = this.props.tasksCases.getActiveTaskTime()
    const activeTask = this.props.tasksCases.getActiveTask()

    if (!activeTask || this.state.timer) return

    const timer = setInterval(this.updateTimeCounter.bind(this, startTime), SECOND)

    this.showStopButton()

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

    if (activeTask && activeTask.id !== this.state.activeTaskId) {
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

  getProjectsOptions(projects){
    if (!projects || projects.list.length < 0) return []
    return projects.list.map(project => {
      return this.getOptionsFromProject(project)
    })
  }

  handleChange(selectedOption){
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  getOptionsFromProject(project){
    return {
      value: project._id,
      label: project.name
    }
  }

  render() {
    const time = this.state.time
    const activeTask = this.props.tasksCases.getActiveTask() || {}

    if (!activeTask) return;

    const options = this.getProjectsOptions(this.props.projects)

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
          <CreatableSelect
            isClearable
            name='project'
            value={ activeTask.project && this.getOptionsFromProject(activeTask.project) }
            onChange={ (optionProject) => this.handleChangeProject(activeTask, optionProject) }
            options={ options }
            isDisabled={ !activeTask.id }
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
