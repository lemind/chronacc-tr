import React, { useState } from 'react'
import { isFunction } from 'helpers/misc'

import Modal from 'components/common/elements/Modal/Modal'
import ColorSelector from 'components/common/elements/ColorSelector/ColorSelector'
import { TColor } from 'models/index'
import './colorBox.less'

type TProps = {
  onColorChange(color: string): void
  color: TColor | undefined
  className?: string
}

const DEFAULT_COLOR: TColor = 'FFF'

export default function ColorBox(props: TProps): JSX.Element | null {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const color: TColor = props.color || DEFAULT_COLOR

  const colorStyle = {
    background: `#${ color }`,
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
    <div className={ props.className }>
      <div
        className="colorBox"
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
    </div>
  )
}
