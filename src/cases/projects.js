import Task from 'models/Task'
import withGateways from 'helpers/withGateways'
import { caseFactory } from 'helpers/case'
import Cases from './index'
import ProjectsGateway from 'src/redux/projects'
import { makeOptionsFromItem } from 'helpers/select'

@withGateways(ProjectsGateway)
export class ProjectsCases extends Cases {
  constructor(props){
    super(props);
  }

  setObservables(){
    return [{store: 'projects', variables: ['list']}]
  }

  load(){
    const { projectsGateway } = this.gateways
    projectsGateway.load()
  }

  updateProject(project){
    const { projectsGateway } = this.gateways
    projectsGateway.updateProject(project)
  }

  deleteProject(projectId){
    const { projectsGateway } = this.gateways
    projectsGateway.deleteProject(projectId)
  }

  addProject(project){
    const { projectsGateway } = this.gateways
    projectsGateway.addProject(project)
  }

  getListLikeOptions(){
    const { projectsGateway } = this.gateways
    const list = projectsGateway.state.projects.list

    if (list.length < 1) return []
    return list.map(project => {
      return makeOptionsFromItem(project)
    })
  }

}

export default caseFactory(ProjectsCases, 'ProjectsCases')
