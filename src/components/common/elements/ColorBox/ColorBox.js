import React from 'react'
import isFunction from 'lodash/isFunction'

import Modal from 'components/common/elements/Modal/Modal'
import ColorSelector from 'components/common/elements/ColorSelector/ColorSelector'

export default class ColorBox extends React.Component {
  constructor() {
    super()

    this.state = {
      isModalOpen: false
    }
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  onCloseModal() {
    this.closeModal()
  }

  onColorChange(color){
    const { onColorChange } = this.props
    isFunction(onColorChange) && onColorChange(color)
    this.closeModal()
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
          isOpen={ this.state.isModalOpen }
        >
          <ColorSelector
            color={ model.color }
            onColorChange={ (color) => this.onColorChange(color) }
          />
        </Modal>
      </span>
    )
  }
}

