import React from 'react'

import { Timer } from 'components/Timer/Timer'
import { Tasks } from 'components/Tasks/Tasks'

export class Starter extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Timer />
        </div>
        <Tasks /> 
      </div>
    )
  };
}

