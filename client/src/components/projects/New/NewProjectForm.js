import React, { useState } from 'react'

import useCases from 'helpers/useCases'

import ProjectsCases from 'cases/projects'
import ColorBox from 'components/common/elements/ColorBox/ColorBox'

export default function NewProjectForm() {
  const { projectsCases } = useCases(ProjectsCases)

  const [tempProject, setTempProject] = useState({_id: '0'})

  const onColorChange = () => {
    return (newColor) => {
      setTempProject({ ...tempProject, color: newColor })
    }
  }

  const createProject = () => {
    projectsCases.addProject(tempProject)
    setTempProject({ _id: 0 })
  }

  const updateNewProjectName = (e) => {
    setTempProject({ ...tempProject, name: e.target.value })
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
        model={ tempProject }
        onColorChange={ onColorChange() }
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
