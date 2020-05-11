import React from 'react'
import CreatableSelect from 'react-select/lib/Creatable'

import useCases from 'helpers/useCases'
import TasksCases from 'cases/tasks'
import ProjectsCases from 'cases/projects'
import { makeOptionFromItem } from 'helpers/select'
import { ITask } from 'models/Task'
import { TSelectOption } from 'cases/projects'
import { IMongoId } from 'models/index'

type TProps = {
  task: ITask | null,
}

export default function EditTaskForm(props: TProps): JSX.Element | null {
  const { tasksCases } = useCases(TasksCases)
  const { projectsCases } = useCases(ProjectsCases)

  const handleChangeProject = (task: ITask, optionProject: TSelectOption): void => {
    if (!optionProject) {
      tasksCases.bindProject(task, null)
      return
    }
    const project = {
      isNew: optionProject.__isNew__,
      _id: optionProject.value as IMongoId,
      name: optionProject.label
    }

    tasksCases.bindProject(task, project)
  }

  const updateTask = (e: React.FormEvent<HTMLInputElement>): void => {
    const { task } = props
    if (!task) return
    task.description = e.currentTarget.value
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