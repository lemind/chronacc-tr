
export const initialState = {
  list: [],
  serverData: {},
  loading: false,
  error: null,
  hasMore: true
};

export const reducer = (state = initialState, action) => {
  let newList
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        list: [action.task, ...state.list],
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
        loading: true,
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
        serverData: action.payload
      }
    case 'CLEAR_TASKS':
      return {
        ...state,
        list: []
      }
    case 'SERVER_TASKS_PREPARED':
      return {
        ...state,
        loading: false,
        serverData: {},
        list: [...state.list, ...action.payload.list],
        hasMore: action.payload.hasMore
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
