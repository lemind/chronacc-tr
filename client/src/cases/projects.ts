import { casesFactory } from 'helpers/case'
import Cases, { ICases } from './index'
import type { TFollowedStoreSchema } from './index'
import ProjectsGateway from 'src/redux/projects'
import { makeOptionFromItem } from 'helpers/select'
import { IProjectsState } from 'src/redux/projects/projects.reducer'
import type { IProject } from 'models/Project'
import { IMongoId } from 'models/index'

export type TSelectOption = {
  value: string | number,
  label: string,
  __isNew__?: boolean,
}

export interface IProjectsCases {
  updateProject(project: IProject): void
  addProject(newProject: IProject): void
  deleteProject(projectId: IMongoId): void
  load(): void
  getListLikeOptions(): TSelectOption[]
}

export type IProjectsCasesCommon = IProjectsCases & ICases;

// @withGateways(ProjectsGateway) // obsolete
export class ProjectsCases extends Cases implements IProjectsCases {
  setObservables(): TFollowedStoreSchema[] {
    return [{store: 'projects', variables: ['list', 'error']}]
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

}

export default casesFactory(ProjectsCases, [ProjectsGateway], 'ProjectsCases')
