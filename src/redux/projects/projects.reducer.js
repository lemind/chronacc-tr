
export const initialState = {
  list: [],
  loading: false,
  error: null,
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
    default:
      return state
  }
}
