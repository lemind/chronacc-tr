import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/lib/Creatable'

import withCases from 'helpers/withCases'
import useCases from 'helpers/useCases'
import TasksCases from 'cases/tasks'
import ProjectsCases from 'cases/projects'
import { makeOptionFromItem } from 'helpers/select'
import { diff, utcFormat, duration, TIME_FORMAT } from 'helpers/dateTime'

const SECOND = 1000
const DEFAULT_COLOR = 'c22326'

export function TimerDraft() {
  const { tasksCases, tasks } = useCases(TasksCases)
  const { projectsCases, projects } = useCases(ProjectsCases)

  const [taskInProgress, setTaskInProgress] = useState(false)
  const [time, setTime] = useState(null)
  const [timer, setTimer] = useState(null)
  const [activeTaskId, setActiveTaskId] = useState(null)
  const [days, setDays] = useState(null)


  const showStartButton = () => setTaskInProgress(false)
  const showStopButton = () => setTaskInProgress(true)

  const timerStart = () => {
    const startTime = tasksCases.getActiveTaskTime()
    const activeTask = tasksCases.getActiveTask()

    if (!activeTask || timer) return

    if (activeTaskId != null) {
      timerStop()
    }

    const timer = setInterval(() => updateTimeCounter(startTime), SECOND)

    showStopButton()

    setTimer(timer)
    setActiveTaskId(activeTask._id)
  }

  const timerStop = () => {
    if (!timer) return

    clearInterval(timer)

    setTimer(null)
    setTime(null)
  }

  const stop = () => {
    tasksCases.stopActiveTask()

    timerStop()

    showStartButton()

    setActiveTaskId(null)
    setTaskInProgress(false)
  }

  const start = () => {
    tasksCases.startTask()
  }

  const updateTimeCounter = (startTime) => {
    const diffMs = diff(startTime)
    const days = diff(startTime, 'days')
    const time = startTime
      ? utcFormat(diffMs, TIME_FORMAT)
      : ''

    setTime(time)
    setDays(days)
  }

  const getProjectsLikeOptions = () => {
    return projectsCases.getListLikeOptions()
  }

  const updateTask = (e) => {
    const activeTask = tasksCases.getActiveTask()
    activeTask.description = e.target.value
    tasksCases.updateTask(activeTask)
  }

  const handleChangeProject = (activeTask, optionProject) => {
    const project = {
      isNew: optionProject.__isNew__,
      _id: optionProject.value,
      name: optionProject.label
    }

    if (optionProject.__isNew__) {
      project.color = DEFAULT_COLOR
    }

    tasksCases.bindProject(activeTask, project)
  }

  useEffect(() => {
    if (!tasksCases || !projectsCases) return
    const activeTask = tasksCases.getActiveTask()

    if (projects && projects.list.length === 0) {
      projectsCases.load()
    }

    if (activeTask && activeTask._id !== activeTaskId) {
      timerStart()
    }
  }, [tasks])

  useEffect(() => {
    if (!tasksCases || !projectsCases) return
    const activeTask = tasksCases.getActiveTask()

    if (activeTask && activeTask._id !== activeTaskId) {
      timerStart()
    }

    return () => {
      tasksCases && tasksCases.unsubscribe()
      projectsCases && projectsCases.unsubscribe()
      timerStop()
    }
  }, [activeTaskId])

  if (!tasksCases || !projectsCases) return null
  const activeTask = tasksCases.getActiveTask() || {}
  if (!activeTask) return null

  const options = getProjectsLikeOptions(projectsCases)

  const daysString = !!days
    ? `${duration(days, "day").humanize()} `
    : ''

  return (
    <div>
      <div>time: {daysString} { time }</div>
      <br />
      <div>
        <input
          value={ activeTask.description || '' }
          onChange={ e => updateTask(e) }
          disabled={ !activeTask._id }
        />
        <CreatableSelect
          isClearable
          name='project'
          value={ activeTask.project && makeOptionFromItem(activeTask.project) }
          onChange={ (optionProject) => handleChangeProject(activeTask, optionProject) }
          options={ options }
          isDisabled={ !activeTask._id }
        />
      </div>
      <br />
      { !taskInProgress
        ? <button onClick={ () => start() } data-test="button-start">Start</button>
        : <button onClick={ () => stop() } data-test="button-stop">Stop</button>
      }
    </div>
  )
}

@withCases(TasksCases, ProjectsCases)
export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskInProgress: false,
      time: null,
      timer: null,
      activeTaskId: null,
      days: null
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
    const diffMs = diff(startTime)

    const days = diff(startTime, 'days')

    const time = startTime
      ? utcFormat(diffMs, TIME_FORMAT)
      : ''

    this.setState({
      time,
      days
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
      if (prevState.activeTaskId != null) {
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

    if (optionProject.__isNew__) {
      project.color = DEFAULT_COLOR
    }

    this.props.tasksCases.bindProject(activeTask, project)
  }

  getProjectsLikeOptions(){
    return this.props.projectsCases.getListLikeOptions()
  }

  render() {
    const { days, time } = this.state
    const activeTask = this.props.tasksCases.getActiveTask() || {}

    if (!activeTask) return;

    const options = this.getProjectsLikeOptions()

    const daysString = !!days
      ? `${duration(days, "day").humanize()} `
      : ''

    return (
      <div>
        <div>time: {daysString} { time }</div>
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
            value={ activeTask.project && makeOptionFromItem(activeTask.project) }
            onChange={ (optionProject) => this.handleChangeProject(activeTask, optionProject) }
            options={ options }
            isDisabled={ !activeTask._id }
          />
        </div>
        <br />
        { !this.state.taskInProgress
          ? <button onClick={ () => this.start() } data-test="button-start">Start</button>
          : <button onClick={ () => this.stop() } data-test="button-stop">Stop</button>
        }
      </div>
    )
  }
}
