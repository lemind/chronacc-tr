
// ToDo: is it needs to remove it?
const serverDataTransform = (serverData) => {
  const clientData = {...serverData}
  clientData.id = serverData._id
  return clientData;
}

export const actions = {
  fetchTasks: () => ({
    type: 'FETCH_TASKS'
  }),
  fetchTasksSucceeded: (payload) => ({
    type: 'FETCH_TASKS_SUCCEEDED',
    payload
  }),
  addTaskSucceeded: (payload) => {
    const transformedPayload = serverDataTransform(payload)
    return {
      type: 'ADD_TASK_SUCCEEDED',
      payload: transformedPayload
    }
  },
  requestFailed: (error) => ({
    type: 'REQUEST_FAILED',
    error
  }),
  setActiveTask: (taskId) => ({
    type: 'SET_ACTIVE_TASK',
    taskId
  }),
  addTask: (task) => ({
    type: 'ADD_TASK',
    task
  }),
  updateTask: (task) => ({
    type: 'UPDATE_TASK',
    task
  }),
  deleteTask: (taskId) => ({
    type: 'DELETE_TASK',
    taskId
  })
}
