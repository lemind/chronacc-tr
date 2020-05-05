import React, { useState } from 'react'

import useCases from 'helpers/useCases'

import ProjectsCases from 'cases/projects'
import ColorBox from 'components/common/elements/ColorBox/ColorBox'
import Project, { IProject } from 'models/Project'
import { TColor } from 'models/index'

const stubProject = new Project({_id: '0', name: ''})

export default function NewProjectForm(): JSX.Element {
  const { projectsCases } = useCases(ProjectsCases)

  const [tempProject, setTempProject] = useState<IProject>(stubProject)

  const onColorChange = (newColor: TColor): void => {
    setTempProject({ ...tempProject, color: newColor })
  }

  const createProject = (): void => {
    projectsCases.addProject(tempProject)
    setTempProject(stubProject)
  }

  const updateNewProjectName = (e: React.FormEvent<HTMLInputElement>): void => {
    setTempProject({ ...tempProject, name: e.currentTarget.value })
  }

  return (
    <div>
      <div>________________________________________</div>
      <br />
      <input
        value={ tempProject.name || '' }
        onChange={ e => updateNewProjectName(e) }
      />
      <ColorBox
        color={ tempProject.color }
        onColorChange={ onColorChange }
      />
      <button
        onClick={ () => createProject() }
      >Create project</button>
      <div>________________________________________</div>
      <br />
      <br />
    </div>
  )
}
