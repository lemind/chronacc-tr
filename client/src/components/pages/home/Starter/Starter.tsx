import React, { useEffect } from 'react'

import useCases from 'helpers/useCases'

import TasksCases from 'cases/tasks'
import Timer from 'components/pages/home/Timer/Timer'
import Tasks from 'components/pages/home/Tasks/Tasks'
import LoginForm from 'components/common/blocks/Auth/LoginForm'
import AuthCases from 'cases/auth'

import Task from 'models/Task'

export default function Starter(): JSX.Element {
  const { tasksCases, tasks } = useCases(TasksCases)
  const { authCases, auth } = useCases(AuthCases)

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

  useEffect(() => {
    if (tasksCases) {
      tasksCases.load({reset: true})
    }

    return () => {
      authCases && authCases.unsubscribe()
    }
  }, [auth?.user])

  // ToDo: get model from Case
  const tasksList = tasks ? tasks.list.map(task => new Task(task)) : []

  return (
    <div>
      <div>
        <Timer />
        <LoginForm />
      </div>
      <Tasks tasks={ tasksList } />
    </div>
  )
}
