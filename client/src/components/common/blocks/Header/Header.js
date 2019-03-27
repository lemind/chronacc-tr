import React from 'react'

import Menu from 'components/common/blocks/Menu/Menu'
import Notifier from 'components/common/elements/Notifier/Notifier'

export default class Header extends React.Component {
  render() {

    const notifierStyle = {
      position: 'absolute',
      top: 0,
      right: '5px',
    }

    return (
      <header>
        <Menu />
        <div style={ notifierStyle } ><Notifier /></div>
      </header>
    )
  }
}
