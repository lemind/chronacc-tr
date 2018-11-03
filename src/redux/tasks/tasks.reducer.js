
export const initialState = {
  list: [],
  loading: false,
  error: null,
  activeTaskId: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        list: [...state.list, action.task],
      };
    case 'UPDATE_TASK':
      const newList = state.list.map((item, index) => {
        if (item.id !== action.task.id) {
          return item
        }

        return {
          ...item,
          ...action.task
        }
      })
      return {
        ...state,
        list: newList
      };
    case 'DELETE_CITY':
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.cityId)
      };
    case 'FETCH_TASKS':
      return {
        ...state,
        list: [],
        loading: true
      };
    case 'FETCH_TASKS_SUCCEEDED':
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    case 'FETCH_TASKS_FAILED':
      return {
        ...state,
        list: [],
        loading: false,
        error: action.error
      };
    case 'SET_ACTIVE_TASK':
      return {
        ...state,
        activeTaskId: action.taskId
      };
    default:
      return state
  }
}
