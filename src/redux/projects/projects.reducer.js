
export const initialState = {
  list: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
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
    default:
      return state
  }
}
