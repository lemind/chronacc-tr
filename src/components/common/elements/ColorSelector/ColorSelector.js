import React from 'react'
import isFunction from 'lodash/isFunction'

const COLORS = [
  'C22326',
  'F37338',
  'FDB632',
  '027878',
  '801638'
]

export default class ColorSelector extends React.Component {

  selectColor(color){
    const { onColorChange } = this.props
    isFunction(onColorChange) && onColorChange(color)
  }

  renderColor(color, isActive){
    //ToDo: move to css const ones
    const colorStyle = {
      width: '40px',
      height: '25px',
      background: `#${ color || 'FFF' }`,
      border: isActive ? '1px solid black' : 'none',
      display: 'inline-block',
      cursor: 'pointer'
    }

    return <div
        style={ colorStyle }
        onClick={ () => this.selectColor(color) }
      />
  }

  isColorActive(color, selectedColor){
    return color === selectedColor
  }

  render() {
    const colors = COLORS
    const selectedColor = this.props.color

    return (
      <div>
        { colors.map((color) =>
          <div key={ color }>
            { this.renderColor(color, this.isColorActive(color, selectedColor)) }
          </div>
        ) }
      </div>
    )
  }
}
