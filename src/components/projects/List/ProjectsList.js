import React from 'react'

import withCases from 'helpers/withCases'

import ProjectsCases from 'cases/projects'
import ColorBox from 'components/common/elements/ColorBox/ColorBox'

@withCases(ProjectsCases)
export default class ProjectsList extends React.Component {

  componentWillMount(){
    this.props.projectsCases.load()
  }

  onColorChange(project) {
    return (newColor) => {
      project.color = newColor
      this.props.projectsCases.updateProject(project)
    }
  }

  renderProject(project){
    return <div>
      <span>{ project._id }</span>
      <span> | </span>
      <span>
        <input
          value={ project.name }
          onChange={ e => this.updateProject(project, e) }
        />
      </span>
      <span> | </span>
      <span>
        <ColorBox
          model={ project }
          onColorChange={ this.onColorChange(project) }
        />
      </span>
      <span> | </span>
      <span>
        <button
          onClick={ () => this.deleteProject(project) }
        >Delete</button>
      </span>
    </div>
  }

  deleteProject(project){
    this.props.projectsCases.deleteProject(project._id)
  }

  updateProject(project, e){
    project.name = e.target.value
    this.props.projectsCases.updateProject(project)
  }

  render() {
    let projects = this.props.projects ? this.props.projects.list : []

    return (
      <div>
        <h5>Projects list</h5>
        { projects.map((project, index) =>
          <div key={ project._id }>
            <br />
            { this.renderProject(project) }
          </div>
        ) }
      </div>
    )
  }
}
