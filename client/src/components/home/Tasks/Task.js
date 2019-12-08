import React, { useEffect } from 'react'

import withCases from 'helpers/withCases'
import { utcFormat } from 'helpers/dateTime'
import { isFunction } from 'helpers/misc'
import Modal from 'components/common/elements/Modal/Modal'
import TasksCases from 'cases/tasks'
import EditTaskForm from 'components/home/EditTaskForm/EditTaskForm'
import ConfirmModal from 'components/common/elements/ConfirmModal/ConfirmModal'
import ScrollLoad from 'components/common/elements/ScrollLoad/ScrollLoad'

const TIME_FORMAT = 'HH:mm:ss' //ToDo: move to date helpers

@withCases(TasksCases)
export default class Task extends React.Component {
  openEditTaskModal(task) {
    const { onEdit } = this.props
    if (isFunction(onEdit)) {
      onEdit(task)
    }
  }

  formattedTime(raw){
    if (!raw) return '-'

    return utcFormat(raw, TIME_FORMAT)
  }

  continueTask(task){
    this.props.tasksCases.startTask(task)
  }

  deleteTask(task){
    this.props.tasksCases.deleteTask(task._id)
  }

  render() {
    const { task } = this.props;
    const disabled = task.isActive()

    const projectNameStyle = {
      background: `#${ task.project ? task.project.color : 'FFF' }`,
      color: '#FFF',
      padding: '5px'
    }

    const DIGITS_SHOW_FROM_ID = 5
    return <div>
      <span>{ task.isActive() && '_____ ' }</span>
      <span>{ task.dayStart() }</span>
      <span> | </span>
      <span>{  task._id && '...' + task._id.substr(task._id.length - DIGITS_SHOW_FROM_ID) }</span>
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
          onClick={ () => this.continueTask(task) }
          disabled={ disabled }
        >Continue</button>
      </span>
      <span> | </span>
      <span>
        <button
          onClick={ () => this.openEditTaskModal(task) }
          disabled={ disabled }
        >Edit</button>
      </span>
      <span> | </span>
      <span>
        <ConfirmModal
          onConfirm={ () => this.deleteTask(task) }
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