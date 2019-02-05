import React from 'react'

import withCases from 'helpers/withCases'

import ProjectsCases from 'cases/projects'
import ColorBox from 'components/common/elements/ColorBox/ColorBox'

@withCases(ProjectsCases)
export default class NewProjectForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      tempProject: {
        _id: 0
      }
    }
  }

  onColorChange() {
    return (newColor) => {
      this.setState({
        tempProject: {
          ...this.state.tempProject,
          color: newColor
        }
      })
    }
  }

  createProject(){
    this.props.projectsCases.addProject(this.state.tempProject)
    this.setState({
      tempProject: { _id: 0 }
    })
  }

  updateNewProjectName(e){
    this.setState({
      tempProject: {
        ...this.state.tempProject,
        name: e.target.value
      }
    })
  }

  render() {
    return (
      <div>
        <div>__________________________________</div>
        <input
          value={ this.state.tempProject.name || '' }
          onChange={ e => this.updateNewProjectName(e) }
        />
        <ColorBox
          model={ this.state.tempProject }
          onColorChange={ this.onColorChange() }
        />
        <button
          onClick={ () => this.createProject() }
        >Create project</button>
        <div>__________________________________</div>
      </div>
    )
  }
}
