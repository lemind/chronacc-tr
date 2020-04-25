import React, { useEffect } from 'react'

import useCases from 'helpers/useCases'
import { utcFormat, TIME_FORMAT } from 'helpers/dateTime'
import { isFunction } from 'helpers/misc'
import TasksCases from 'cases/tasks'
import ConfirmModal from 'components/common/elements/ConfirmModal/ConfirmModal'
import { getShortId } from 'helpers/misc';

export default function Task({ task, onEdit }) {
  const { tasksCases } = useCases(TasksCases)

  const openEditTaskModal = () => {
    if (isFunction(onEdit)) {
      onEdit(task)
    }
  }

  const formattedTime = (raw) => {
    if (!raw) return '-'

    return utcFormat(raw, TIME_FORMAT)
  }

  const continueTask = () => {
    tasksCases.startTask(task)
  }

  const deleteTask = () => {
    tasksCases.deleteTask(task._id)
  }

  const shortTaskId = () => {
    if (!task || !task._id) return
    return getShortId(task._id)
  }

  const disabled = task.isActive
  const projectNameStyle = {
    background: `#${ task.project ? task.project.color : 'FFF' }`,
    color: '#FFF',
    padding: '5px'
  }

  return <div>
    <span>{ task.isActive && '_____ ' }</span>
    <span>{ task.startDay }</span>
    <span> | </span>
    <span>{ shortTaskId() }</span>
    <span> | </span>
    <span
      style={ projectNameStyle }
    >{ task.project && task.project.name }</span>
    <span> | </span>
    <span>{ task.description }</span>
    <span> | </span>
    <span>{ formattedTime(task.summTime) }</span>
    <span> | </span>
    <span>
      <button
        onClick={ continueTask }
        disabled={ disabled }
      >Continue</button>
    </span>
    <span> | </span>
    <span>
      <button
        onClick={ openEditTaskModal }
        disabled={ disabled }
      >Edit</button>
    </span>
    <span> | </span>
    <span>
      <ConfirmModal
        onConfirm={ deleteTask }
      >
        <button
          disabled={ disabled }
        >Delete</button>
      </ConfirmModal>
    </span>
    <span>{ task.isActive && ' _____' }</span>
  </div>
}
