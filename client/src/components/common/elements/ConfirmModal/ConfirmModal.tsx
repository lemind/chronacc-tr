import React, { useState } from 'react'
import { isFunction } from 'helpers/misc'

import Modal from 'components/common/elements/Modal/Modal'

import './confirmModal.less'

const ARE_YOU_SURE_MESSAGE: string = 'Are you sure?'

type TProps = {
  message?: string,
  children: JSX.Element,
  onConfirm(): void
}

export default function ConfirmModal(props: TProps): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const { message, children } = props
  const confirmMessage = message || ARE_YOU_SURE_MESSAGE

  const onCloseModal = (): void => {
    setModalIsOpen(false)
  }

  const confirm = (): void => {
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
        isOpen={ modalIsOpen }
        title="Deleting"
      >
        <div className="confirmModalBody" >{ confirmMessage }</div>
        <button
          onClick={ () => confirm() }
          data-test="confirm-modal-ok"
        >Ok</button>
        <button onClick={ () => setModalIsOpen(false) }>Cancel</button>
      </Modal>
    </span>
  )
}
