import React from 'react'
import CreatableSelect from 'react-select/lib/Creatable'

import withCases from 'helpers/withCases'
import TasksCases from 'cases/tasks'
import ProjectsCases from 'cases/projects'
import { makeOptionsFromItem } from 'helpers/select'

@withCases(TasksCases, ProjectsCases)
export default class EditTaskForm extends React.Component {

  handleChangeProject(task, optionProject){
    if (!optionProject) {
      this.props.tasksCases.bindProject(task, null)
      return
    }
    const project = {
      isNew: optionProject.__isNew__,
      _id: optionProject.value,
      name: optionProject.label
    }

    this.props.tasksCases.bindProject(task, project)
  }

  getProjectsLikeOptions(){
    return this.props.projectsCases.getListLikeOptions()
  }

  updateTask(e){
    const { task } = this.props
    task.description = e.target.value
    this.props.tasksCases.updateTask(task)
  }

  render() {
    const { task } = this.props

    if (!task) return null

    const options = this.getProjectsLikeOptions()

    return (
      <div>
        <input
          value={ task.description || '' }
          onChange={ e => this.updateTask(e) }
        />
        <CreatableSelect
          isClearable
          name='project'
          value={ task.project && makeOptionsFromItem(task.project) }
          onChange={ (optionProject) => this.handleChangeProject(task, optionProject) }
          options={ options }
        />
      </div>
    )
  }
}
