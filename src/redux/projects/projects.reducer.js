
export const initialState = {
  list: [],
  loading: false,
  error: null
};

export const reducer = (state = initialState, action) => {
  let newList

  switch (action.type) {
    case 'FETCH_PROJECTS':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_PROJECTS_SUCCEEDED':
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    case 'REQUEST_FAILED':
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case 'UPDATE_PROJECT':
      newList = state.list.map((item, index) => {
        if (item._id !== action.project._id) {
          return item
        }

        return Object.assign(item, {...action.project})
      })
      return {
        ...state,
        list: newList,
        loading: true
      }
    case 'UPDATE_PROJECT_SUCCEEDED':
      return {
        ...state,
        loading: false
      }
    case 'DELETE_PROJECT':
      return {
        ...state,
        loading: true,
        list: state.list.filter(item => item._id !== action.projectId)
      }
    case 'DELETE_TASK_SUCCEEDED':
      return {
        ...state,
        loading: false
      }
    case 'ADD_PROJECT':
      return {
        ...state,
        list: [...state.list, action.project],
        loading: true
      }
    case 'ADD_PROJECT_SUCCEEDED':
      newList = state.list.map((item, index) => {
        if (item._id !== 0) { // 0 - temp id
          return item
        }

        return Object.assign(item, {...action.payload})
      })
      return {
        ...state,
        loading: false,
        list: newList
      }
    default:
      return state
  }
}
