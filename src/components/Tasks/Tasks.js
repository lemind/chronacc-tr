import React from 'react'
import moment from 'moment'

import withCases from 'helpers/withCases'

import TasksCases from 'cases/tasks'

const TIME_FORMAT = 'HH:mm:ss'

@withCases(TasksCases)
export class Tasks extends React.Component {
  renderTask(task){
    const disabled = task.isActive()

    return <div>
      <span>{ task.isActive() && '_____ ' }</span>
      <span>{ task.id }</span>
      <span> | </span>
      <span>{ task.description }</span>
      <span> | </span>
      <span>{ this.formattedTime(task.getSummTime()) }</span>
      <span> | </span>
      <span>
        <button
          onClick={ () => this.continueTask(task) }
          disabled={ disabled }
        >Continue</button>
      </span>
      <span> | </span>
      <span>
        <button
          onClick={ () => this.deleteTask(task) }
          disabled={ disabled }
        >Delete</button>
      </span>
      <span>{ task.isActive() && ' _____' }</span>
    </div>
  }

  formattedTime(raw){
    if (!raw) return '-'

    return moment(raw).utc().format(TIME_FORMAT)
  }

  continueTask(task){
    this.props.tasksCases.startTask(task)
  }

  deleteTask(task){
    this.props.tasksCases.deleteTask(task.id)
  }

  render() {
    let tasks = this.props.tasks ? this.props.tasks.list : []
    tasks = Array.from(tasks)
    tasks.reverse()

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