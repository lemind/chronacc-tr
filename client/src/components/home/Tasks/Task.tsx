import React from 'react'

import useCases from 'helpers/useCases'
import { utcFormat, TIME_FORMAT, TMoment } from 'helpers/dateTime'
import { isFunction } from 'helpers/misc'
import TasksCases from 'cases/tasks'
import ConfirmModal from 'components/common/elements/ConfirmModal/ConfirmModal'
import { getShortId } from 'helpers/misc';
import { ITask } from 'models/Task'

type TProps = {
  task: ITask
  onEdit(task: ITask): void
}

export default function Task({ task, onEdit }: TProps): JSX.Element {
  const { tasksCases } = useCases(TasksCases)

  const openEditTaskModal = (): void => {
    if (isFunction(onEdit)) {
      onEdit(task)
    }
  }

  const formattedTime = (raw: TMoment): string => {
    if (!raw) return '-'

    return utcFormat(raw, TIME_FORMAT)
  }

  const continueTask = (): void => {
    tasksCases.startTask(task)
  }

  const deleteTask = (): void => {
    tasksCases.deleteTask(task._id)
  }

  const shortTaskId = (): string => {
    if (!task || !task._id) return ''
    return getShortId(task._id)
  }

  const isActionsDisabled = task.isActive
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
        disabled={ isActionsDisabled }
      >Continue</button>
    </span>
    <span> | </span>
    <span>
      <button
        onClick={ openEditTaskModal }
        disabled={ isActionsDisabled }
      >Edit</button>
    </span>
    <span> | </span>
    <span>
      <ConfirmModal
        onConfirm={ deleteTask }
      >
        <button
          disabled={ isActionsDisabled }
        >Delete</button>
      </ConfirmModal>
    </span>
    <span>{ task.isActive && ' _____' }</span>
  </div>
}
