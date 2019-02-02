
export const actions = {
  fetchProjects: () => ({
    type: 'FETCH_PROJECTS'
  }),
  fetchProjectsSucceeded: (payload) => {
    return {
      type: 'FETCH_PROJECTS_SUCCEEDED',
      payload: payload
    }
  },
  requestFailed: (error) => ({
    type: 'REQUEST_FAILED',
    error
  }),
  updateProject: (project) => ({
    type: 'UPDATE_PROJECT',
    project
  }),
  updateProjectSucceeded: (payload) => {
    return {
      type: 'UPDATE_PROJECT_SUCCEEDED',
      payload: payload
    }
  },
}
