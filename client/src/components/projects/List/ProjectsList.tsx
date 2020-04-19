import React, { useEffect } from 'react'

import useCases from 'helpers/useCases'

import ProjectsCases from 'cases/projects'
import ColorBox from 'components/common/elements/ColorBox/ColorBox'
import ConfirmModal from 'components/common/elements/ConfirmModal/ConfirmModal'
import { getShortId } from 'helpers/misc';
import { IProject } from 'models/Project'

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

  const getShortProjectId = (project) => {
    if (!project || !project._id) return
    return getShortId(project._id)
  }

  // ToDo: extract
  const renderProject = (project: IProject): JSX.Element => {
    return <div>
      <span>{ getShortProjectId(project) }</span>
      <span> | </span>
      <span>
        <input
          value={ project.name }
          onChange={ e => updateProject(project, e) }
        />
      </span>
      <span> | </span>
      <span>
        <ColorBox
          model={ project }
          onColorChange={ onColorChange(project) }
        />
      </span>
      <span> | </span>
      <span>
        <ConfirmModal
          onConfirm={ () => deleteProject(project) }
          message='Projects for all related tasks will be vanished forever. Are you sure?'
        >
          <button>Delete</button>
        </ConfirmModal>
      </span>
    </div>
  }

  const deleteProject = (project: IProject) => {
    projectsCases.deleteProject(project._id)
  }

  const updateProject = (project: IProject, e) => {
    project.name = e.target.value
    projectsCases.updateProject(project)
  }


  if (!projects) return null
  let projectsList = projects ? projects.list : []

  return (
    <div>
      <h5>Projects list</h5>
      { projectsList.map((project, index) =>
        <div key={ project._id }>
          <br />
          { renderProject(project) }
        </div>
      ) }
    </div>
  )
}
