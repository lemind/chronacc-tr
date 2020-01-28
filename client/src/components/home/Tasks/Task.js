import React, { useEffect } from 'react'

import withCases from 'helpers/withCases'
import { utcFormat } from 'helpers/dateTime'
import { isFunction } from 'helpers/misc'
import TasksCases from 'cases/tasks'
import ConfirmModal from 'components/common/elements/ConfirmModal/ConfirmModal'
import { getShortId } from 'helpers/misc';

const TIME_FORMAT = 'HH:mm:ss' //ToDo: move to date helpers

@withCases(TasksCases)
export default class Task extends React.Component {
  openEditTaskModal = () => {
    const { props: { task, onEdit } } = this
    if (isFunction(onEdit)) {
      onEdit(task)
    }
  }

  formattedTime(raw) {
    if (!raw) return '-'

    return utcFormat(raw, TIME_FORMAT)
  }

  continueTask = () => {
    const { props: { task, tasksCases } } = this
    tasksCases.startTask(task)
  }

  deleteTask = () => {
    const { props: { task, tasksCases } } = this
    tasksCases.deleteTask(task._id)
  }

  get shortTaskId() {
    const { task } = this.props

    if (!task || !task._id) return
    return getShortId(task._id)
  }

  render() {
    const { task } = this.props;
    const disabled = task.isActive()

    const projectNameStyle = {
      background: `#${ task.project ? task.project.color : 'FFF' }`,
      color: '#FFF',
      padding: '5px'
    }

    return <div>
      <span>{ task.isActive() && '_____ ' }</span>
      <span>{ task.dayStart() }</span>
      <span> | </span>
      <span>{ this.shortTaskId }</span>
      <span> | </span>
      <span
        style={ projectNameStyle }
      >{ task.project && task.project.name }</span>
      <span> | </span>
      <span>{ task.description }</span>
      <span> | </span>
      <span>{ this.formattedTime(task.getSummTime()) }</span>
      <span> | </span>
      <span>
        <button
          onClick={ this.continueTask }
          disabled={ disabled }
        >Continue</button>
      </span>
      <span> | </span>
      <span>
        <button
          onClick={ this.openEditTaskModal }
          disabled={ disabled }
        >Edit</button>
      </span>
      <span> | </span>
      <span>
        <ConfirmModal
          onConfirm={ this.deleteTask }
        >
          <button
            disabled={ disabled }
          >Delete</button>
        </ConfirmModal>
      </span>
      <span>{ task.isActive() && ' _____' }</span>
    </div>
  }
}