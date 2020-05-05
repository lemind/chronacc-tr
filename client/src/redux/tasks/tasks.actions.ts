import { createAsyncAction, action } from 'typesafe-actions'

import { IMongoId } from "models/index"
import { ITask } from "models/Task"

type Error = {}

export const fetchTasks = createAsyncAction(
  'FETCH_TASKS',
  'FETCH_TASKS_SUCCEEDED',
  'REQUEST_FAILED',
)<string, ITask[], Error>()

export const updateTask = createAsyncAction(
  'UPDATE_TASK',
  'UPDATE_TASK_SUCCEEDED',
  'REQUEST_FAILED',
)<ITask, ITask, Error>()

export const createTask = createAsyncAction(
  'CREATE_TASK',
  'CREATE_TASK_SUCCEEDED',
  'REQUEST_FAILED',
)<any, ITask, Error>()

export const deleteTask = createAsyncAction(
  'DELETE_TASK',
  'DELETE_TASK_SUCCEEDED',
  'REQUEST_FAILED',
)<IMongoId, IMongoId, Error>()

export const clearTaskType = 'CLEAR_TASKS'
const clearTasks = () => action(clearTaskType)

export const serverTasksPreparedType = 'SERVER_TASKS_PREPARED'
const serverTasksPrepared = (tasks: any) => action(serverTasksPreparedType, { ...tasks });

export default {
  fetchTasks,
  updateTask,
  createTask,
  deleteTask,
  clearTasks,
  serverTasksPrepared
}