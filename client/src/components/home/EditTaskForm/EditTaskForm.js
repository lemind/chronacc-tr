import React from 'react'
import CreatableSelect from 'react-select/lib/Creatable'

import useCases from 'helpers/useCases'
import TasksCases from 'cases/tasks'
import ProjectsCases from 'cases/projects'
import { makeOptionFromItem } from 'helpers/select'

export default function EditTaskForm(props) {
  const { tasksCases } = useCases(TasksCases)
  const { projectsCases } = useCases(ProjectsCases)

  const handleChangeProject = (task, optionProject) => {
    if (!optionProject) {
      tasksCases.bindProject(task, null)
      return
    }
    const project = {
      isNew: optionProject.__isNew__,
      _id: optionProject.value,
      name: optionProject.label
    }

    tasksCases.bindProject(task, project)
  }

  const updateTask = (e) => {
    const { task } = props
    task.description = e.target.value
    tasksCases.updateTask(task)
  }

  const { task } = props

  if (!task) return null
  if (!projectsCases || !tasksCases) return null

  const projectOptions = projectsCases.getListLikeOptions()

  return (
    <div>
      <input
        value={ task.description || '' }
        onChange={ e => updateTask(e) }
      />
      <CreatableSelect
        isClearable
        name='project'
        value={ task.project && makeOptionFromItem(task.project) }
        onChange={ (projectOption) => handleChangeProject(task, projectOption) }
        options={ projectOptions }
      />
    </div>
  )

}
