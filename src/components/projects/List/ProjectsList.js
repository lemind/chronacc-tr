import React from 'react'

import withCases from 'helpers/withCases'

import ProjectsCases from 'cases/projects'
import ColorBox from 'components/common/elements/ColorBox/ColorBox'

@withCases(ProjectsCases)
export default class ProjectsList extends React.Component {

  componentWillMount(){
    this.props.projectsCases.load()
  }

  renderProject(project){
    return <div>
      <span>{ project._id }</span>
      <span> | </span>
      <span>{ project.name }</span>
      <span> | </span>
      <span>
        <ColorBox model={ project } />
      </span>
    </div>
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
