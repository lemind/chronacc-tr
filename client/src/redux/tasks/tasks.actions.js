
export const actions = {
  fetchTasks: (params) => ({
    type: 'FETCH_TASKS',
    params
  }),
  clearTasks: () => ({
    type: 'CLEAR_TASKS'
  }),
  fetchTasksSucceeded: (payload) => {
    return {
      type: 'FETCH_TASKS_SUCCEEDED',
      payload: payload
    }
  },
  addTaskSucceeded: (payload) => {
    return {
      type: 'ADD_TASK_SUCCEEDED',
      payload: payload
    }
  },
  updateTaskSucceeded: (payload) => {
    return {
      type: 'UPDATE_TASK_SUCCEEDED',
      payload: payload
    }
  },
  serverTasksPrepared: (payload) => {
    return {
      type: 'SERVER_TASKS_PREPARED',
      payload
    }
  },
  deleteTaskSucceeded: () => {
    return {
      type: 'DELETE_TASK_SUCCEEDED'
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
