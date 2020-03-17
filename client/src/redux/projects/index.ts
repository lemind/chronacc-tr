import { actions } from './projects.actions'
import { reducer } from './projects.reducer'
import { projectsEpics } from './projects.epics'
import { gatewayFactory } from 'helpers/gateway'
import Gateway from '../Gateway'
import Project from 'models/Project'

export {
  actions as projectsActions,
  reducer as projectsReducer,
  projectsEpics,
}

export class ProjectsGateway extends Gateway {
  updateProject(project: Project): void {
    this.dispatch(actions.updateProject(project))
  }

  addProject(newProject: Project): void {
    this.dispatch(actions.addProject(newProject))
  }

  deleteProject(projectId: any): void {
    this.dispatch(actions.deleteProject(projectId))
  }

  load(): void {
    this.dispatch(actions.fetchProjects())
  }

}

export default gatewayFactory(ProjectsGateway)
