import { getType, ActionType } from 'typesafe-actions'

import { ITask } from 'models/Task'
import actions, { clearTaskType,
  serverTasksPreparedType } from './tasks.actions'

type Action = ActionType<typeof actions>

export interface ITasksState {
  list: ITask[],
  serverData: Object,
  loading: boolean,
  error: any,
  hasMore: boolean
}

export const initialState = {
  list: [],
  serverData: {},
  loading: false,
  error: null,
  hasMore: true
};

const {
  fetchTasks,
  updateTask,
  createTask,
  deleteTask,
} = actions

const fetchTasksType = getType(fetchTasks.request)
const fetchTasksSucceededType = getType(fetchTasks.success)
// ToDo: temp? one failed for all requests
const requestFailedType = getType(fetchTasks.failure)

const updateTaskType = getType(updateTask.request)
const updateTaskSucceededType = getType(updateTask.success)

const deleteTaskType = getType(deleteTask.request)
const deleteTaskSucceededType = getType(deleteTask.success)

const createTaskType = getType(createTask.request)
const createTaskSucceededType = getType(createTask.success)

export const reducer = (state: ITasksState = initialState, action: Action) => {
  let newList
  switch (action.type) {
    case createTaskType:
      return {
        ...state,
        list: [action.payload, ...state.list],
        loading: true
      }
    case updateTaskType:
      return {
        ...state,
        loading: true
      }
    case deleteTaskType:
      return {
        ...state,
        loading: true,
      }
    case fetchTasksType:
      return {
        ...state,
        loading: true
      }
    case fetchTasksSucceededType:
      return {
        ...state,
        serverData: action.payload
      }
    case clearTaskType:
      return {
        ...state,
        list: []
      }
    case serverTasksPreparedType:
      return {
        ...state,
        loading: false,
        serverData: {},
        list: [...state.list, ...action.payload.list],
        hasMore: action.payload.hasMore
      }
    case createTaskSucceededType:
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
    case updateTaskSucceededType:
      newList = state.list.map((item, index) => {
        if (item._id !== action.payload._id) {
          return item
        }

        return Object.assign(item, {...action.payload})
      })
      return {
        ...state,
        loading: false,
        list: newList
      }
    case deleteTaskSucceededType:
      return {
        ...state,
        loading: false,
        list: state.list.filter(item => item._id !== action.payload)
      }
    case requestFailedType:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
