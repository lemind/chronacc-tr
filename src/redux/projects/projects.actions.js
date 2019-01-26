
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
  })
}
