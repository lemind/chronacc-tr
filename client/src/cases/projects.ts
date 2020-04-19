import { casesFactory } from 'helpers/case'
import Cases from './index'
import type { TFollowedStoreSchema } from './index'
import ProjectsGateway from 'src/redux/projects'
import { makeOptionFromItem } from 'helpers/select'
import { IProjectsState } from 'src/redux/projects/projects.reducer'

// @withGateways(ProjectsGateway) // obsolete
export class ProjectsCases extends Cases {
  setObservables(): TFollowedStoreSchema[] {
    return [{store: 'projects', variables: ['list', 'error']}]
  }

  load() {
    const { projectsGateway } = this.gateways
    super.loadFromGateways([{ gateway: projectsGateway, params: { name: 'projects' } }])
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
    const { list } = <IProjectsState>projectsGateway.state.projects

    if (list.length === 0) return []
    return list.map(project => {
      return makeOptionFromItem(project)
    })
  }

}

export default casesFactory(ProjectsCases, [ProjectsGateway], 'ProjectsCases')
