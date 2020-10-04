import React, { useEffect } from 'react'

import useCases from 'helpers/useCases'

import TasksCases from 'cases/tasks'
import Timer from 'components/pages/home/Timer/Timer'
import Tasks from 'components/pages/home/Tasks/Tasks'

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

  const tasksList = tasks ? tasks.list : []

  return (
    <div>
      <div>
        <Timer />
      </div>
      <Tasks tasks={ tasksList } />
    </div>
  )
}
