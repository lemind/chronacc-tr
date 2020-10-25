import React, { useEffect } from 'react'

import useCases from 'helpers/useCases'
import ProjectsCases from 'cases/projects'

import ProjectItem from './ProjectItem'
import './projectsList.less'


export default function ProjectsList() {
  const { projectsCases, projects } = useCases(ProjectsCases)

  useEffect(() => {
    if (projectsCases) {
      if (projects.list.length === 0) {
        projectsCases.load()
      }
    }

    return () => {
      projectsCases && projectsCases.unsubscribe()
    }
  }, [projectsCases])

  if (!projects) return null
  let projectsList = projects ? projects.list : []

  return (
    <div>
      <h3>Projects list</h3>
      { projectsList.map((project, index) =>
        <div key={ project._id }>
          <br />
          <ProjectItem project={project} projectsCases={projectsCases} />
        </div>
      ) }
    </div>
  )
}
