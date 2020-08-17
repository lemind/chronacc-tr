import React, { useEffect } from 'react'

import useCases from 'helpers/useCases'
import ProjectsCases from 'cases/projects'
import ColorBox from 'components/common/elements/ColorBox/ColorBox'
import ConfirmModal from 'components/common/elements/ConfirmModal/ConfirmModal'
import { IProject } from 'models/Project'
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

  const onColorChange = (project: IProject) => {
    return (newColor) => {
      project.color = newColor
      projectsCases.updateProject(project)
    }
  }

  // ToDo: extract
  const renderProject = (project: IProject): JSX.Element => {
    return <div className="projectsListItem">
      <input
        value={ project.name }
        onChange={ e => updateProject(project, e) }
      />

      <ColorBox
        color={ project.color }
        onColorChange={ onColorChange(project) }
        className="projectItemColorBox"
      />

      <ConfirmModal
        onConfirm={ () => deleteProject(project) }
        message='Projects for all related tasks will be vanished forever. Are you sure?'
      >
        <button>Delete</button>
      </ConfirmModal>
    </div>
  }

  const deleteProject = (project: IProject): void => {
    projectsCases.deleteProject(project._id)
  }

  const updateProject = (project: IProject, e: React.FormEvent<HTMLInputElement>): void => {
    project.name = e.currentTarget.value
    projectsCases.updateProject(project)
  }


  if (!projects) return null
  let projectsList = projects ? projects.list : []

  return (
    <div>
      <h3>Projects list</h3>
      { projectsList.map((project, index) =>
        <div key={ project._id }>
          <br />
          { renderProject(project) }
        </div>
      ) }
    </div>
  )
}
