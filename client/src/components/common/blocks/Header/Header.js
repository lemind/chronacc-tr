import React from 'react'

import Menu from 'components/common/blocks/Menu/Menu'
import Notifier from 'components/common/elements/Notifier/Notifier'

export default function Header() {
  return (
    <header>
      <Menu />
      <Notifier />
    </header>
  )
}
