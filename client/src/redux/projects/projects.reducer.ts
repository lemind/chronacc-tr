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

const fetchProjectsType = getType(fetchProjects.request)
const fetchProjectsSucceededType = getType(fetchProjects.success)
// ToDo: temp? one failed for all requests
const requestFailedType = getType(fetchProjects.failure)

const updateProjectType = getType(updateProject.request)
const updateProjectSucceededType = getType(updateProject.success)

const deleteProjectType = getType(deleteProject.request)
const deleteProjectSucceededType = getType(deleteProject.success)

const createProjectType = getType(createProject.request)
const createProjectSucceededType = getType(createProject.success)

export const reducer = (state: IProjectsState = initialState, action) => {
  let newList

  switch (action.type) {
    case fetchProjectsType:
      return {
        ...state,
        loading: true
      }
    case fetchProjectsSucceededType:
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    case requestFailedType:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case updateProjectType:
      return {
        ...state,
        loading: true
      }
    case updateProjectSucceededType:
      newList = state.list.map((item, index) => {
        if (item._id !== action.payload._id) {
          return item
        }

        return Object.assign(item, {...action.payload})
      })

      return {
        ...state,
        list: newList,
        loading: false
      }
    case deleteProjectType:
      return {
        ...state,
        loading: true,
      }
    case deleteProjectSucceededType:
      return {
        ...state,
        loading: false,
        list: state.list.filter(item => item._id !== action.payload)
      }
    case createProjectType:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: true
      }
    case createProjectSucceededType:
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
