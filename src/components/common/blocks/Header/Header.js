import React from 'react'

import Menu from 'components/common/blocks/Menu/Menu'

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
      </div>
    )
  }
}
