import React from 'react'
import isFunction from 'lodash/isFunction'

import Modal from 'components/common/elements/Modal/Modal'
import ColorSelector from 'components/common/elements/ColorSelector/ColorSelector'

export default function ColorBox(props){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { model } = props

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

  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  const onColorChange = (color) => {
    const { onColorChange } = props
    isFunction(onColorChange) && onColorChange(color)
    setIsModalOpen(false)
  }

  return (
    <span>
      <div
        style={ colorStyle }
        onClick={ () => setIsModalOpen(true) }
      />
      <Modal
        onClose={ () => setIsModalOpen(false) }
        closeModal={ () => onCloseModal() }
        isOpen={ isModalOpen }
      >
        <ColorSelector
          color={ model.color }
          onColorChange={ (color) => onColorChange(color) }
        />
      </Modal>
    </span>
  )
}
