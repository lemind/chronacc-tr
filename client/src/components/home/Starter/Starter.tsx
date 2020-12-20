import React, { useEffect } from 'react'

import useCases from 'helpers/useCases'

import TasksCases from 'cases/tasks'
import Timer from 'components/home/Timer/Timer'
import Tasks from 'components/home/Tasks/Tasks'

import Task from 'models/Task'

export default function Starter(): JSX.Element {
  const { tasksCases, tasks } = useCases(TasksCases)

  useEffect(() => {
    if (tasksCases) {
      if (tasks.list.length === 0) {
        tasksCases.load({reset: true})
      }
    }

    return () => {
      tasksCases && tasksCases.unsubscribe()
    }
  }, [tasksCases])

  // ToDo: get model from Case
  const tasksList = tasks ? tasks.list.map(task => new Task(task)) : []

  return (
    <div>
      <div>
        <Timer />
      </div>
      <Tasks tasks={ tasksList } />
    </div>
  )
}
