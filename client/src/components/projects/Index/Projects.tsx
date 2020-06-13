import React from 'react'

import ProjectsList from 'components/projects/List/ProjectsList'
import NewProjectForm from 'components/projects/New/NewProjectForm'

export default function Projects(): JSX.Element {
  return (
    <div>
      <NewProjectForm />
      <ProjectsList />
    </div>
  )
}
