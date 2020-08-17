import React from 'react'
import isFunction from 'lodash/isFunction'
import { TColor } from 'models/index'
import './colorSelector.less'
import { cc } from 'helpers/classUtils'

// ToDo: main consts
const COLORS: TColor[] = [
  'C22326',
  'F37338',
  'FDB632',
  '027878',
  '801638'
]

const DEFAULT_COLOR: TColor = 'FFF'

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

    const colorStyle = {
      background: `#${ color || DEFAULT_COLOR }`,
    }

    const activeClassName = isColorActive(color, selectedColor)
      ? 'colorSelectorColorItem_active'
      : ''
    const colorClassName = cc('colorSelectorColorItem', activeClassName)

    return <div
        className={ colorClassName }
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
