import React from 'react'

import Timer from 'components/home/Timer/Timer'
import Tasks from 'components/home/Tasks/Tasks'

export default class Starter extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Timer />
        </div>
        <Tasks /> 
      </div>
    )
  }
}

