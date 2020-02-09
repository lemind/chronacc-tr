import React from 'react'
import isFunction from 'lodash/isFunction'

const COLORS = [
  'C22326',
  'F37338',
  'FDB632',
  '027878',
  '801638'
]

export default function ColorSelector(props) {
  const selectColor = (color) => {
    const { onColorChange } = props
    isFunction(onColorChange) && onColorChange(color)
  }

  const renderColor = (color) => {
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

  const isColorActive = (color, selectedColor) => {
    return color === selectedColor
  }

  return (
    <div>
      { COLORS.map((color) =>
        <div key={ color }>
          { renderColor(color, isColorActive(color)) }
        </div>
      ) }
    </div>
  )
}
