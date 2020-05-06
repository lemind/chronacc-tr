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

const SECOND = 1000
// ToDo: main consts
const DEFAULT_COLOR = 'c22326'

export default function Timer() {
  const { tasksCases, tasks } = useCases(TasksCases)
  const { projectsCases, projects } = useCases(ProjectsCases)

  const [taskInProgress, setTaskInProgress] = useState<boolean>(false)
  const [time, setTime] = useState<string | null>(null)
  const [timer, setTimer] = useState<number | null>(null)
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

    const startTime = activeTask && activeTask.startTime

    if (activeTaskId != null) {
      stopTimer()
    }

    if (!activeTask || timer) return

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
    }
  }

  const handleChangeProject = (activeTask: ITask, optionProject: TSelectOption): void => {
    const project = {
      isNew: optionProject.__isNew__,
      _id: optionProject.value,
      name: optionProject.label
    } as IProject

    if (optionProject.__isNew__) {
      project.color = DEFAULT_COLOR
    }

    tasksCases.bindProject(activeTask, project)
  }

  useEffect(() => {
    startTimer()

    if (projects && projects.list.length === 0) {
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

  return (
    <div>
      <div>time: {daysString} { time }</div>
      <br />
      {activeTask && <div>
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
      </div>}
      <br />
      { !taskInProgress
        ? <button onClick={ () => start() } data-test="button-start">Start</button>
        : <button onClick={ () => stop() } data-test="button-stop">Stop</button>
      }
    </div>
  )
}
