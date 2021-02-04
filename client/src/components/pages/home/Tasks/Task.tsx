import React from 'react'

import useCases from 'helpers/useCases'
import { utcFormat, TIME_FORMAT, TMoment } from 'helpers/dateTime'
import { isFunction } from 'helpers/misc'
import TasksCases from 'cases/tasks'
import ConfirmModal from 'components/common/elements/ConfirmModal/ConfirmModal'
import { getShortId } from 'helpers/misc'
import { ITask } from 'models/Task'
import { cc } from 'helpers/classUtils'
import { COLORS } from 'src/styleVars'

import './task.less'

const PROJECT_DEFAULT_COLOR = COLORS.projectDefaultColor

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

  // dev purpose
  const shortTaskId = (): string => {
    if (!task || !task._id) return ''
    return getShortId(task._id)
  }

  const isActionsDisabled = task.isActive
  const projectNameBgStyle = {
    background: `#${ task.project?.color || PROJECT_DEFAULT_COLOR }`,
  }

  const activeClass = task.isActive && 'task_active'

  return <div className={cc('task', activeClass)}>
    <div className='taskStartDay'>{ task.startDay }</div>
    <div className='taskProjectNameWrapper'>
      <div
        className='taskProjectName'
        style={ projectNameBgStyle }
      >
        { task.project && task.project.name }
      </div>
    </div>
    <div className='taskDesc' data-test="tasks-list-item-desc">{ task.description }</div>
    <div className='taskTime'>{ formattedTime(task.summTime) }</div>
    {!task.isActive && <>
      <button
        onClick={ continueTask }
        disabled={ isActionsDisabled }
        data-test="tasks-list-item-button-continue"
      >Continue</button>
      <button
        onClick={ openEditTaskModal }
        disabled={ isActionsDisabled }
        data-test="tasks-list-item-button-edit"
      >Edit</button>
      <ConfirmModal
        onConfirm={ deleteTask }
      >
        <button
          disabled={ isActionsDisabled }
          data-test="tasks-list-item-button-delete"
        >Delete</button>
      </ConfirmModal>
    </>}
  </div>
}
