import React from 'react'

import withCases from 'helpers/withCases'
import TasksCases from 'cases/tasks'
import ProjectsCases from 'cases/projects'

@withCases(TasksCases, ProjectsCases)
export default class Notifier extends React.Component {

  getErrorsArray(){
    return [
      this.props.tasks && this.props.tasks.error,
      this.props.projects && this.props.projects.error
    ]
  }

  getUniqueErrorsArray(){
    const errors = this.getErrorsArray()

    const unique = []
    errors.forEach((value) => {
      if (value) {
        const target = unique.find(item => item.id === value.id)
        if (!target) {
          unique.push(value)
        }
      }
    })
    return unique
  }

  render() {
    const errors = this.getUniqueErrorsArray()

    const errorStyle = {
      color: '#d61313',
      position: 'relative',
      zIndex: '10',
      maxWidth: '300px',
      wordWrap: 'break-word',
    }

    return (
      <div>
        { errors.map((error) =>
          <div
            key={ error.id }
            style={ errorStyle }
          >
            { error.message }
          </div>
        ) }
      </div>
    );
  }
}
