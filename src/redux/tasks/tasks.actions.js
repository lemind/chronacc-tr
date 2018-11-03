export const actions = {
  fetchTasks: () => ({
    type: 'FETCH_TASKS'
  }),
  fetchTasksSucceeded: (payload) => ({
    type: 'FETCH_TASKS_SUCCEEDED',
    payload
  }),
  fetchTasksFailed: (error) => ({
    type: 'FETCH_TASKS_FAILED',
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
