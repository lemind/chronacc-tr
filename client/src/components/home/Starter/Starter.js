import React, { useEffect } from 'react'

import useCases from 'helpers/useCases'
import TasksCases from 'cases/tasks'
import Timer from 'components/home/Timer/Timer'
import Tasks from 'components/home/Tasks/Tasks'

export default function Starter(){
  const { tasksCases, tasks } = useCases(TasksCases)

  useEffect(() => {
    tasksCases && tasksCases.load && tasksCases.load({reset: true})

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
