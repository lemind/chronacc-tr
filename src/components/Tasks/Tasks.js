import React from 'react'

import TasksCases from 'src/redux/tasks'
import withCases from 'helpers/withCases'

@withCases(TasksCases)
export class Tasks extends React.Component {
  render() {
    return (
      <div>
        <div>tasks here</div>
      </div>
    )
  };
}