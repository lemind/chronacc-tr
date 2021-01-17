import React from 'react'

import ProjectsList from 'components/pages/projects/List/ProjectsList'
import NewProjectForm from 'components/pages/projects/New/NewProjectForm'

export default function Projects(): JSX.Element {
  return (
    <div>
      <NewProjectForm />
      <ProjectsList />
    </div>
  )
}
