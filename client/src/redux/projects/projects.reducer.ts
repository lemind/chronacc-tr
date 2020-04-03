import { IProject } from 'models/Project'
import { getType } from 'typesafe-actions';

import { actions } from './projects.actions'

export interface IProjectsState {
  list: Array<IProject>,
  loading: Boolean,
  error: any
}

export const initialState = {
  list: [],
  loading: false,
  error: null
};

const {
  fetchProjects,
  updateProject,
  createProject,
  deleteProject,
} = actions

const fetchProjectsActionType = getType(fetchProjects.request)
const updateProjectActionType = getType(updateProject.request)
const createProjectActionType = getType(createProject.request)
const deleteProjectActionType = getType(deleteProject.request)

// update old actions
// request
// success
// failure


export const reducer = (state: IProjectsState = initialState, action) => {
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
        error: action.payload
      }
    case 'UPDATE_PROJECT':
      console.log('reducer', action);
      newList = state.list.map((item, index) => {
        if (item._id !== action.payload._id) {
          return item
        }

        return Object.assign(item, {...action.payload})
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
    case 'CREATE_PROJECT':
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: true
      }
    case 'CREATE_PROJECT_SUCCEEDED':
      newList = state.list.map((item, index) => {
        if (item._id !== '0') { // 0 - temp id
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
