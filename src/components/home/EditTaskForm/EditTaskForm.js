import React from 'react'
import CreatableSelect from 'react-select/lib/Creatable'

import withCases from 'helpers/withCases'
import TasksCases from 'cases/tasks'
import ProjectsCases from 'cases/projects'

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

  getProjectsOptions(projects){
    if (!projects || projects.list.length < 0) return []
    return projects.list.map(project => {
      return this.getOptionsFromProject(project)
    })
  }

  getOptionsFromProject(project){
    return {
      value: project._id,
      label: project.name
    }
  }

  updateTask(e){
    const { task } = this.props
    task.description = e.target.value
    this.props.tasksCases.updateTask(task)
  }

  render() {
    const { task } = this.props

    if (!task) return null

    const options = this.getProjectsOptions(this.props.projects)

    return (
      <div>
        <input
          value={ task.description || '' }
          onChange={ e => this.updateTask(e) }
        />
        <CreatableSelect
          isClearable
          name='project'
          value={ task.project && this.getOptionsFromProject(task.project) }
          onChange={ (optionProject) => this.handleChangeProject(task, optionProject) }
          options={ options }
        />
      </div>
    )
  }
}
