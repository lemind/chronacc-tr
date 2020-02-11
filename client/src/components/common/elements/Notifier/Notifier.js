import React from 'react'

import useCases from 'helpers/useCases'
import TasksCases from 'cases/tasks'
import ProjectsCases from 'cases/projects'

const getStyles = () => {
  const notifierStyle = {
    position: 'absolute',
    top: 0,
    right: '5px',
    background: '#fff5f5',
    padding: '5px',
    margin: '5px',
  }

  const errorStyle = {
    color: '#d61313',
    position: 'relative',
    zIndex: '10',
    maxWidth: '300px',
    wordWrap: 'break-word',
  }

  return { errorStyle, notifierStyle }
}

export default function Notifier() {
  const { tasks, projects } = useCases(TasksCases, ProjectsCases)

  const { errorStyle, notifierStyle } = getStyles()

  const getErrorsArray = () => {
    return [
      tasks && tasks.error,
      projects && projects.error
    ]
  }

  const getUniqueErrorsArray = () => {
    const errors = getErrorsArray()
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

  const errors = getUniqueErrorsArray()
  return (
    <div style={ notifierStyle }>
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