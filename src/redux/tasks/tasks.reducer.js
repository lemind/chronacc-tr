
export const initialState = {
  list: [],
  serverList: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  let newList
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        list: [...state.list, action.task],
        loading: true
      }
    case 'UPDATE_TASK':
      newList = state.list.map((item, index) => {
        if (item.id !== action.task.id) {
          return item
        }

        return Object.assign(item, {...action.task})
      })
      return {
        ...state,
        list: newList,
        loading: true
      }
    case 'DELETE_TASK':
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.taskId)
      }
    case 'FETCH_TASKS':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_TASKS_SUCCEEDED':
      return {
        ...state,
        serverList: action.payload,
        loading: false
      }
    case 'SERVER_TASKS_PREPARED':
      return {
        ...state,
        serverList: [],
        list: action.payload
      }
    case 'ADD_TASK_SUCCEEDED':
      newList = state.list.map((item, index) => {
        if (item.id !== 0) { // 0 - temp id
          return item
        }

        return Object.assign(item, {...action.payload})
      })
      return {
        ...state,
        loading: false,
        list: newList
      }
    case 'UPDATE_TASK_SUCCEEDED':
      newList = state.list.map((item, index) => {
        if (item.id !== action.payload.id) {
          return item
        }

        return Object.assign(item, {...action.payload})
      })
      return {
        ...state,
        loading: false,
        list: newList
      }
    case 'DELETE_TASK_SUCCEEDED':
      return {
        ...state,
        loading: false
      }
    case 'REQUEST_FAILED':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
