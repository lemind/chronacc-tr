import React from 'react'

import ColorBox from 'components/common/elements/ColorBox/ColorBox'
import ConfirmModal from 'components/common/elements/ConfirmModal/ConfirmModal'
import { IProject } from 'models/Project'
import { IProjectsCases } from 'cases/projects'
import './projectsList.less'

type TProps = {
  project: IProject,
  projectsCases: IProjectsCases,
}

export default class ProjectItem extends React.PureComponent<TProps> {
  onColorChange = (newColor) => {
    const {project, projectsCases} = this.props

    project.color = newColor
    projectsCases.updateProject(project)
  }

  deleteProject = (): void => {
    const {project, projectsCases} = this.props

    projectsCases.deleteProject(project._id)
  }

  updateProject = (e: React.FormEvent<HTMLInputElement>): void => {
    const {project, projectsCases} = this.props

    project.name = e.currentTarget.value
    projectsCases.updateProject(project)
  }

  render() {
    const {project} = this.props

    return <div className="projectsListItem">
      <input
        value={ project.name }
        onChange={ e => this.updateProject(e) }
      />

      <ColorBox
        color={ project.color }
        onColorChange={ newColor => this.onColorChange(newColor) }
        className="projectItemColorBox"
      />

      <ConfirmModal
        onConfirm={ this.deleteProject }
        message='Projects for all related tasks will be vanished forever. Are you sure?'
      >
        <button>Delete</button>
      </ConfirmModal>
    </div>
  }
}