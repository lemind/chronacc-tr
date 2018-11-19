import React from 'react'
import moment from 'moment'

import withCases from 'helpers/withCases'

import TasksCases from 'src/redux/tasks'

const TIME_FORMAT = 'HH:mm:ss'

@withCases(TasksCases)
export class Tasks extends React.Component {
  renderTask(task){
    const disabled = task.isActive()

    return <div>
      <span>{ task.id }</span>
      <span> | </span>
      <span>{ task.description }</span>
      <span> | </span>
      <span>{ this.formattedTime(task.summTime) }</span>
      <span> | </span>
      <span>
        <button
          onClick={ () => this.continueTask(task) }
          disabled={ disabled }
        >Continue</button>
      </span>
    </div>
  }

  formattedTime(raw){
    if (!raw) return '-'

    return moment(raw).utc().format(TIME_FORMAT)
  }

  continueTask(task){
    this.props.tasksCases.startTask(task)
  }

  render() {
    const tasks = this.props.tasks ? this.props.tasks.list : []

    return (
      <div>
        <br />
        <div>Tasks</div>
        { tasks.map((task, index) =>
          <div key={ task.id }>
            <br />
            { this.renderTask(task) }
          </div>
        )}
      </div>
    )
  };
}