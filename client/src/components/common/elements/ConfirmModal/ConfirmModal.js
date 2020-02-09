import React, { useState } from 'react'
import { isFunction } from 'helpers/misc'

import Modal from 'components/common/elements/Modal/Modal'

const ARE_YOU_SURE_MESSAGE = 'Are you sure?'

export default function ConfirmModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { message, children } = props
  const confirmMessage = message || ARE_YOU_SURE_MESSAGE

  const onCloseModal = () => {
    setModalIsOpen(false)
  }

  const confirm = () => {
    const { onConfirm } = props
    isFunction(onConfirm) && onConfirm()
    setModalIsOpen(false)
  }

  return (
    <span>
      <span
        onClick={ () => setModalIsOpen(true) }
      >{ children }</span>
      <Modal
        onClose={ onCloseModal }
        closeModal={ () => setModalIsOpen(false) }
        isOpen={ modalIsOpen }
      >
        <div>{ confirmMessage }</div>
        <button onClick={ () => confirm() }>Ok</button>
        <button onClick={ () => setModalIsOpen(false) }>Cancel</button>
      </Modal>
    </span>
  )
}
