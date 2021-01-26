import React from 'react'
import CreatableSelect from 'react-select/lib/Creatable'

import useCases from 'helpers/useCases'
import TasksCases from 'cases/tasks'
import ProjectsCases from 'cases/projects'
import { makeOptionFromItem } from 'helpers/select'
import { ITask } from 'models/Task'
import { TSelectOption } from 'cases/projects'
import { IMongoId } from 'models/index'

import './editTaskForm.less'

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

    let project = projectsCases.getProjectById(optionProject.value as IMongoId)

    if (!project) {
      project = {
        isNew: optionProject.__isNew__,
        _id: optionProject.value as IMongoId,
        name: optionProject.label
      }
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

  // ToDo: make cmp for timerProjectColor
  const projectColorStyle = {
    background: `#${ task?.project?.color }`,
  }

  return (
    <div className="editTaskForm">
      <div className="editTaskLine">
        <label>Description</label>
        <input
          value={ task.description || '' }
          onChange={ e => updateTask(e) }
          data-test="edit-task-form-input"
        />
      </div>
      <div className="editTaskLine">
        <label>Project</label>
        <CreatableSelect
          isClearable
          name='project'
          value={ task.project && makeOptionFromItem(task.project) }
          onChange={ (projectOption) => handleChangeProject(task, projectOption) }
          options={ projectOptions }
          className="timerProject"
        />
        <div
          className='timerProjectColor'
          style={ projectColorStyle }
        />
      </div>
    </div>
  )

}
