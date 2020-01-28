import React from 'react'
import isFunction from 'lodash/isFunction'
import Modal from 'components/common/elements/Modal/Modal'


export default class ConfirmModal extends React.Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  onCloseModal = () => {
    this.closeModal()
  }

  confirm = () => {
    const { onConfirm } = this.props
    isFunction(onConfirm) && onConfirm()
    this.closeModal()
  }

  render() {
    const { message, children } = this.props
    const confirmMessage = message || 'Are you sure?'
    return (
      <span>
        <span
          onClick={ this.openModal }
        >{ children }</span>
        <Modal
          onClose={ this.onCloseModal }
          closeModal={ this.closeModal }
          isOpen={ this.state.modalIsOpen }
        >
          <div>{ confirmMessage }</div>
          <button onClick={ this.confirm }>Ok</button>
          <button onClick={ this.closeModal }>Cancel</button>
        </Modal>
      </span>
    )
  }
}
