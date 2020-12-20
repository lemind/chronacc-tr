import { casesFactory } from 'helpers/case'
import Cases, { ICases } from './index'
import type { TFollowedStoreSchema } from './index'
import ProjectsGateway from 'src/redux/projects'
import { makeOptionFromItem } from 'helpers/select'
import { IProjectsState } from 'src/redux/projects/projects.reducer'
import type { IProject } from 'models/Project'
import { IMongoId } from 'models/index'
import { AuthUserFormType } from '../models/AuthUser'


export interface IAuthCases {
  login(user: AuthUserFormType): void
  register(user: AuthUserFormType): void
  getAuthUserEmail(): string
}

export type IAuthCasesCommon = IAuthCases & ICases;

export class AuthCases extends Cases implements IAuthCases {
  setObservables(): TFollowedStoreSchema[] {
    return [{store: 'auth', variables: ['user', 'error', 'fetched']}]
  }

  load(): void {
    const { projectsGateway } = this.gateways
    this.loadFromGateways([{ gateway: projectsGateway, params: { name: 'projects' } }])
  }

  updateProject(project: IProject): void {
    const { projectsGateway } = this.gateways
    projectsGateway.updateProject(project)
  }

  deleteProject(projectId: IMongoId): void {
    const { projectsGateway } = this.gateways
    projectsGateway.deleteProject(projectId)
  }

  addProject(project: IProject): void {
    const { projectsGateway } = this.gateways
    projectsGateway.addProject(project)
  }

  getListLikeOptions(): TSelectOption[] {
    const { projectsGateway } = this.gateways
    const { list } = <IProjectsState>projectsGateway.state.projects

    if (list.length === 0) return []
    return list.map(project => {
      return makeOptionFromItem(project)
    })
  }

  // ToDo: add kinda helper for cases?
  getProjects(): IProject[]{
    const { projectsGateway } = this.gateways
    const state = projectsGateway.store.getState()
    return state.projects.list
  }

  getProjectById(id: IMongoId): IProject | undefined {
    const projects = this.getProjects()
    return projects.find(project => project._id === id)
  }

}

export default casesFactory(ProjectsCases, [AuthGateway], 'ProjectsCases')
