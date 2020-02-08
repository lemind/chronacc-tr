import React, { useEffect } from 'react'

import withCases from 'helpers/withCases'
import useCasesDraft from 'helpers/useCases'
import TasksCases from 'cases/tasks'
import Timer from 'components/home/Timer/Timer'
import Tasks from 'components/home/Tasks/Tasks'

// DoTo: deprecated
@withCases(TasksCases)
export class StarterDeprecated extends React.Component {
  componentWillMount(){
    this.props.tasksCases.load({reset: true})
  }

  componentWillUnmount(){
    this.props.tasksCases.unsubscribe && this.props.tasksCases.unsubscribe()
  }

  render(){
    const tasks = this.props.tasks ? this.props.tasks.list : []

    return (
      <div>
        <div>
          <Timer />
        </div>
        <Tasks tasks={ tasks } />
      </div>
    )
  }
}

export default function Starter(){
  const { tasksCases, tasks } = useCasesDraft(TasksCases)

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
