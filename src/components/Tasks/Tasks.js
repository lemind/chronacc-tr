import React from 'react'

import TasksCases from 'src/redux/tasks'
import withCases from 'helpers/withCases'

@withCases(TasksCases)
export class Tasks extends React.Component {
  renderTask(task){
    return <div>
      { task.id }
    </div>
  }

  render() {
    const tasks = this.props.tasks ? this.props.tasks.list : []

    return (
      <div>
        <div>Tasks</div>
        { tasks.map((task, index) =>
          <div key={ task.id }>
            { this.renderTask(task) }
          </div>
        )}
      </div>
    )
  };
}