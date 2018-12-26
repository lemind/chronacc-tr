import React from 'react'

import { Timer } from 'components/Timer/Timer'
import { Tasks } from 'components/Tasks/Tasks'

export class Starter extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <header>
        <div>
          <Timer />
          <Tasks />
        </div>
      </header>
    )
  };
}

