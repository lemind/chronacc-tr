import React, { useState } from 'react'
import { isFunction } from 'helpers/misc'

import Modal from 'components/common/elements/Modal/Modal'
import ColorSelector from 'components/common/elements/ColorSelector/ColorSelector'
import { TColor } from 'models/index'

type TProps = {
  onColorChange(color: string): void
  color: TColor | undefined
}

const DEFAULT_COLOR: TColor = 'FFF'

export default function ColorBox(props: TProps): JSX.Element | null {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const color: TColor = props.color || DEFAULT_COLOR

  //ToDo: move to css const ones
  const colorStyle = {
    width: '40px',
    height: '25px',
    background: `#${ color }`,
    border: '1px solid black',
    display: 'inline-block',
    cursor: 'pointer'
  }

  const onCloseModal = (): void => {
    setModalIsOpen(false)
  }

  const onColorChange = (color: TColor): void => {
    const { onColorChange } = props
    isFunction(onColorChange) && onColorChange(color)
    setModalIsOpen(false)
  }

  return (
    <span>
      <div
        style={ colorStyle }
        onClick={ () => setModalIsOpen(true) }
      />
      <Modal
        onClose={ onCloseModal }
        isOpen={ modalIsOpen }
      >
        <ColorSelector
          color={ color }
          onColorChange={ (color) => onColorChange(color) }
        />
      </Modal>
    </span>
  )
}
