import withGateways from 'helpers/withGateways'
import { casesFactory } from 'helpers/case'
import Cases from './index'
import ProjectsGateway from 'src/redux/projects'
import { makeOptionFromItem } from 'helpers/select'

// @withGateways(ProjectsGateway)
export class ProjectsCases extends Cases {
  setObservables() {
    return [{store: 'projects', variables: ['list', 'error']}]
  }

  load() {
    const { projectsGateway } = this.gateways
    projectsGateway.load()
  }

  updateProject(project) {
    const { projectsGateway } = this.gateways
    projectsGateway.updateProject(project)
  }

  deleteProject(projectId) {
    const { projectsGateway } = this.gateways
    projectsGateway.deleteProject(projectId)
  }

  addProject(project) {
    const { projectsGateway } = this.gateways
    projectsGateway.addProject(project)
  }

  getListLikeOptions() {
    const { projectsGateway } = this.gateways
    const { list } = projectsGateway.state.projects

    if (list.length === 0) return []
    return list.map(project => {
      return makeOptionFromItem(project)
    })
  }

}

// ToDo move gateways to factory?
export default casesFactory(ProjectsCases, [ProjectsGateway], 'ProjectsCases')
