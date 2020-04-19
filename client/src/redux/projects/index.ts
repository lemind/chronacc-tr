import { ActionType } from 'typesafe-actions';
import actions from './projects.actions'
import { reducer } from './projects.reducer'
import projectsEpics from './projects.epics'
import { gatewayFactory } from 'helpers/gateway'
import Gateway, { IGateway } from '../Gateway'
import type { IProject } from 'models/Project'

import { IMongoId } from 'models/index'

export type ProjectActionType = ActionType<typeof actions>

export {
  actions as projectsActions,
  reducer as projectsReducer,
  projectsEpics,
}

export interface IProjectsGateway {
  updateProject(project: IProject): void
  addProject(newProject: IProject): void
  deleteProject(projectId: IMongoId): void
  load(): void;
}

export type IProjectsGatewayCommon = IProjectsGateway & IGateway

export class ProjectsGateway extends Gateway implements IProjectsGateway {
  updateProject(project: IProject): void {
    this.dispatch(actions.updateProject.request(project))
  }

  addProject(newProject: IProject): void {
    this.dispatch(actions.createProject.request(newProject))
  }

  deleteProject(projectId: IMongoId): void {
    this.dispatch(actions.deleteProject.request(projectId))
  }

  load(): void {
    this.dispatch(actions.fetchProjects.request(''))
  }

}

export default gatewayFactory<IProjectsGatewayCommon>(ProjectsGateway)
