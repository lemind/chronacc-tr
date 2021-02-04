import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/lib/Creatable'

import useCases from 'helpers/useCases'
import TasksCases from 'cases/tasks'
import ProjectsCases, { TSelectOption } from 'cases/projects'
import { makeOptionFromItem } from 'helpers/select'
import { diff, utcFormat, duration, TIME_FORMAT, TMoment } from 'helpers/dateTime'
import { IMongoId } from 'models/index'
import { ITask } from 'models/Task'
import { IProject } from 'models/Project'

import './timer.less'
import { COLORS } from 'src/styleVars'

const SECOND = 1000
// ToDo: main consts
const DEFAULT_COLOR = 'c22326'

export default function Timer() {
  const { tasksCases, tasks } = useCases(TasksCases)
  const { projectsCases, projects } = useCases(ProjectsCases)

  const [taskInProgress, setTaskInProgress] = useState<boolean>(false)
  const [time, setTime] = useState<string | null>(null)
  const [timer, setTimer] = useState<number | null>(null)
  const [unsavedDesc, setUnsavedDesc] = useState<string | null>(null)
  const [activeTaskId, setActiveTaskId] = useState<IMongoId | null>(null)
  const [days, setDays] = useState<number | null>(null)

  const showStartButton = () => setTaskInProgress(false)
  const showStopButton = () => setTaskInProgress(true)

  const startTimer = (): void => {
    if (!tasksCases || !projectsCases) return
    const activeTask = tasksCases.getActiveTask()

    if (activeTask && activeTask._id === activeTaskId) {
      return
    }

    if (activeTask === null) {
      stopTimer()
      showStartButton()
    }

    const startTime = activeTask && activeTask.startTime

    if (activeTaskId != null) {
      stopTimer()
    }

    if (!activeTask || timer) {
      return
    }

    const timerId = setInterval(() => updateTimeCounter(startTime), SECOND)

    showStopButton()

    setTimer(timerId)

    setActiveTaskId(activeTask._id)
  }

  const stopTimer = (): void => {
    if (!timer) return

    clearInterval(timer)

    setTimer(null)
    setTime(null)
  }

  const stop = (): void => {
    tasksCases.stopActiveTask()

    stopTimer()

    showStartButton()

    setActiveTaskId(null)
    setTaskInProgress(false)
  }

  const start = (): void => {
    tasksCases.startTask()
  }

  const updateTimeCounter = (startTime: number | null): void => {
    if (startTime === null) return
    const diffMs = diff(startTime)
    const days = diff(startTime, 'days')
    const time = startTime
      ? utcFormat(diffMs, TIME_FORMAT)
      : ''

    setTime(time)
    setDays(days)
  }

  const getProjectsLikeOptions = (): TSelectOption[] => {
    return projectsCases.getListLikeOptions()
  }

  const updateTask = (e: React.FormEvent<HTMLInputElement>): void => {
    const activeTask = tasksCases.getActiveTask()
    if (activeTask) {
      activeTask.description = e.currentTarget.value
      tasksCases.updateTask(activeTask)
      setUnsavedDesc(null)
    }
  }

  const updateStateDesc = (e: React.FormEvent<HTMLInputElement>): void => {
    setUnsavedDesc(e.currentTarget.value)
  }

  const handleChangeProject = (activeTask: ITask, optionProject: TSelectOption): void => {
    let project = projectsCases.getProjectById(optionProject.value as IMongoId)

    if (!project) {
      project = {
        isNew: optionProject.__isNew__,
        _id: optionProject.value as IMongoId,
        name: optionProject.label
      } as IProject
    }

    if (optionProject.__isNew__) {
      project.color = DEFAULT_COLOR
    }

    tasksCases.bindProject(activeTask, project)
  }

  useEffect(() => {
    startTimer()

    if (projects && !projects.fetched && !projects.loading) {
      projectsCases.load()
    }
  }, [tasks])

  useEffect(() => {
    startTimer()

    return () => {
      tasksCases && tasksCases.unsubscribe()
      projectsCases && projectsCases.unsubscribe()
      stopTimer()
    }
  }, [activeTaskId])


  if (!tasksCases || !projectsCases) return null
  const activeTask = tasksCases.getActiveTask()

  const options = getProjectsLikeOptions()

  const daysString = !!days
    ? `${duration(days, "day").humanize()} `
    : ''

  const projectColorStyle = {
    background: `#${ activeTask?.project?.color || COLORS.projectDefaultColor }`,
  }

  return (
    <div className="timer">
      <div className="timerFirstLine">
        <div className="timerTimeBlock">
          timer:
          <span className="timerTime" data-test="timer-time" >{daysString} { time }</span>
        </div>
        { !taskInProgress
          ? <button onClick={ start } data-test="button-start">Start</button>
          : <button onClick={ stop } data-test="button-stop">Stop</button>
        }
      </div>
      {activeTask && <div className="timerSecondLine">
        <label>Description</label>
        <input
          value={ unsavedDesc || activeTask.description || '' }
          onChange={ e => updateStateDesc(e) }
          onBlur={ e => updateTask(e) }
          disabled={ !activeTask._id }
          className="timerDesc"
          data-test="input-desc"
        />
        <label>Project</label>
        <CreatableSelect
          isClearable
          name='project'
          value={ activeTask.project && makeOptionFromItem(activeTask.project) }
          onChange={ (optionProject) => handleChangeProject(activeTask, optionProject) }
          options={ options }
          isDisabled={ !activeTask._id }
          className="timerProject"
        />
        <div
          className='timerProjectColor'
          style={ projectColorStyle }
        />
      </div>}
    </div>
  )
}
