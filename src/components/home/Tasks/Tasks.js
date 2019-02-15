import React from 'react'
import moment from 'moment'

import withCases from 'helpers/withCases'
import Modal from 'components/common/elements/Modal/Modal'
import TasksCases from 'cases/tasks'
import EditTaskForm from 'components/home/EditTaskForm/EditTaskForm'
import ConfirmModal from 'components/common/elements/ConfirmModal/ConfirmModal'

const TIME_FORMAT = 'HH:mm:ss'

@withCases(TasksCases)
export default class Tasks extends React.Component {
  constructor() {
    super()

    this.state = {
      isEditModalOpen: false,
      currentEditableTask: null
    }
  }

  openEditTaskModal(task) {
    this.setState({
      isEditModalOpen: true,
      currentEditableTask: task
    })
  }

  closeEditTaskModal() {
    this.setState({
      isEditModalOpen: false,
      currentEditableTask: null
    })
  }

  onCloseEditTaskModal() {
    this.closeEditTaskModal()
  }

  renderTask(task){
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
      <span>{  task.id && '...' + task.id.substr(task.id.length - 5) }</span>
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

  componentWillMount(){
    this.props.tasksCases.load()
  }

  componentWillUnmount(){
    this.props.tasksCases.unsubscribe && this.props.tasksCases.unsubscribe()
  }

  render() {
    let tasks = this.props.tasks ? this.props.tasks.list : []
    tasks = Array.from(tasks)
    tasks.reverse()

    return (
      <div>
        <br />
        <h5>Tasks</h5>
        { tasks.map((task, index) =>
          <div key={ task.id }>
            <br />
            { this.renderTask(task) }
          </div>
        ) }

        <Modal
          onClose={ () => this.onCloseEditTaskModal() }
          closeModal={ () => this.closeEditTaskModal() }
          isOpen={ this.state.isEditModalOpen }
        >
          <EditTaskForm
            task={ this.state.currentEditableTask }
          />
        </Modal>
      </div>
    )
  }
}
