import React from 'react'

import ProjectsList from 'components/projects/List/ProjectsList'
import NewProjectForm from 'components/projects/New/NewProjectForm'

export default class Projects extends React.Component {
  render() {
    return (
      <div>
        <NewProjectForm />
        <ProjectsList />
      </div>
    )
  }
}
