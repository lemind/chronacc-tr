import React from 'react'

import withCases from 'helpers/withCases'
import { utcFormat } from 'helpers/dateTime'
import Modal from 'components/common/elements/Modal/Modal'
import TasksCases from 'cases/tasks'
import EditTaskForm from 'components/home/EditTaskForm/EditTaskForm'
import ConfirmModal from 'components/common/elements/ConfirmModal/ConfirmModal'
import ScrollLoad from 'components/common/elements/ScrollLoad/ScrollLoad';

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

  componentWillMount(){
    this.props.tasksCases.load({reset: true})
  }

  componentWillUnmount(){
    this.props.tasksCases.unsubscribe && this.props.tasksCases.unsubscribe()
  }

  loadMore(){
    if (!this.props.tasks) return

    if (!this.props.tasks.loading
      && this.props.tasks.list.length > 0) {
      this.props.tasksCases.load()
    }
  }

  render() {
    let tasks = this.props.tasks ? this.props.tasks.list : []
    tasks = Array.from(tasks)

    const hasMore = this.props.tasks ? this.props.tasks.hasMore : false
    const { loading } = this.props.tasks

    return (
      <div>
        <br />
        <h5>Tasks</h5>
        <ScrollLoad
          loadMore={ () => this.loadMore() }
          hasMore={ hasMore }
          loading={ loading }
        >
          { tasks.map((task, index) =>
            <div key={ task._id }>
              <br />
              { this.renderTask(task) }
            </div>
          ) }
        </ScrollLoad>

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
