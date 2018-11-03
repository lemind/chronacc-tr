import React from 'react'
// import './Starter.less';

import { Timer as TimerWR } from 'components/TimerWR/Timer'
import { Tasks } from 'components/Tasks/Tasks'

export class Starter extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <header>
        <div>
          <TimerWR />
          <Tasks />
        </div>
      </header>
    )
  };
}

