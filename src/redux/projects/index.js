import { actions } from './projects.actions'
import { reducer } from './projects.reducer'
import { projectsEpics } from './projects.epics'
import { gatewayFactory } from 'helpers/gateway'
import Project from 'models/Project'
import Gateway from 'src/redux/Gateway'


export {
  actions as projectsActions,
  reducer as projectsReducer,
  projectsEpics,
}

export class ProjectsGateway extends Gateway {
  constructor(...params){
    super(...params)
  }

  updateProject(project){
    this.dispatch(actions.updateProject(project))
  }

  addProject(newProject){
    // this.dispatch(actions.addProject(newProject))
  }

  deleteProject(projectId){
    this.dispatch(actions.deleteProject(projectId))
  }

  load(){
    this.dispatch(actions.fetchProjects())
  }

}

export default gatewayFactory(ProjectsGateway)
