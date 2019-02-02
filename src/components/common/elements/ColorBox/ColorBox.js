import React from 'react'

import Modal from 'components/common/elements/Modal/Modal'
import ColorSelector from 'components/common/elements/ColorSelector/ColorSelector'

export default class ColorBox extends React.Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false
    }
  }

  openModal() {
    console.log('OPEN')
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false }, () => {
      console.log('2222', this.state.modalIsOpen)
    });
  }

  onCloseModal() {
    console.log('3333')
    this.closeModal();
  }

  render() {
    const { model } = this.props

    if (!model) {
      return null
    }

    //ToDo: move to css const ones
    const colorStyle = {
      width: '40px',
      height: '25px',
      background: `#${ model.color || 'FFF' }`,
      border: '1px solid black',
      display: 'inline-block',
      cursor: 'pointer'
    }

    return (
      <span>
        <div
          style={ colorStyle }
          onClick={ () => this.openModal() }
        />
        <Modal
          onClose={ () => this.onCloseModal() }
          closeModal={ () => this.closeModal() }
          isOpen={ this.state.modalIsOpen }
        >
          <ColorSelector model={ model } />
        </Modal>
      </span>
    )
  }
}

