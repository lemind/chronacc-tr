import actions from './projects.actions'
import { reducer } from './projects.reducer'
import projectsEpics from './projects.epics'
import { gatewayFactory } from 'helpers/gateway'
import Gateway from '../Gateway'
import Project from 'models/Project'

import { IMongoId } from 'models/index'

export {
  actions as projectsActions,
  reducer as projectsReducer,
  projectsEpics,
}

export class ProjectsGateway extends Gateway {
  updateProject(project: Project): void {
    this.dispatch(actions.updateProject.request(project))
  }

  addProject(newProject: Project): void {
    this.dispatch(actions.createProject.request(newProject))
  }

  deleteProject(projectId: IMongoId): void {
    this.dispatch(actions.deleteProject.request(projectId))
  }

  load(): void {
    this.dispatch(actions.fetchProjects.request(''))
  }

}

export default gatewayFactory(ProjectsGateway)