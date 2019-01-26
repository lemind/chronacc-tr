import Task from 'models/Task'
import withGateways from 'helpers/withGateways'
import { caseFactory } from 'helpers/case'
import Cases from './index'
import ProjectsGateway from 'src/redux/projects'

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

}

export default caseFactory(ProjectsCases, 'ProjectsCases')
