import React from 'react'
import isFunction from 'lodash/isFunction'
import { TColor } from 'models/index'

// ToDo: main consts
const COLORS: TColor[] = [
  'C22326',
  'F37338',
  'FDB632',
  '027878',
  '801638'
]

type TProps = {
  onColorChange(color: string): void
  color: TColor
}

export default function ColorSelector(props: TProps): JSX.Element | null {
  const selectColor = (color: TColor): void => {
    const { onColorChange } = props
    isFunction(onColorChange) && onColorChange(color)
  }

  const renderColor = (color: TColor): JSX.Element => {
    const selectedColor = props.color

    //ToDo: move to css const ones
    const colorStyle = {
      width: '40px',
      height: '25px',
      background: `#${ color || 'FFF' }`,
      border: isColorActive(color, selectedColor) ? '1px solid black' : 'none',
      display: 'inline-block',
      cursor: 'pointer'
    }

    return <div
        style={ colorStyle }
        onClick={ () => selectColor(color) }
      />
  }

  const isColorActive = (color: TColor, selectedColor: TColor): boolean => {
    return color === selectedColor
  }

  if (!props.color) {
    return null
  }

  return (
    <div>
      { COLORS.map((color) =>
        <div key={ color }>
          { renderColor(color) }
        </div>
      ) }
    </div>
  )
}
