
// ToDo: is it needs to remove it?
const serverDataTransform = (serverData) => {
  const clientData = {...serverData}
  clientData.id = serverData._id
  return clientData;
}

const tasksTransform = (serverTasks) => {
  const clientTasks = []
  serverTasks.forEach(task => {
    clientTasks.push(serverDataTransform(task))
  })
  return clientTasks
}

export const actions = {
  fetchTasks: () => ({
    type: 'FETCH_TASKS'
  }),
  fetchTasksSucceeded: (payload) => {
    const clientTasks = tasksTransform(payload)
    return {
      type: 'FETCH_TASKS_SUCCEEDED',
      payload: clientTasks
    }
  },
  addTaskSucceeded: (payload) => {
    const transformedPayload = serverDataTransform(payload)
    return {
      type: 'ADD_TASK_SUCCEEDED',
      payload: transformedPayload
    }
  },
  updateTaskSucceeded: (payload) => {
    const transformedPayload = serverDataTransform(payload)
    return {
      type: 'UPDATE_TASK_SUCCEEDED',
      payload: transformedPayload
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
