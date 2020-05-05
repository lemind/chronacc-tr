import { createAsyncAction } from 'typesafe-actions'

import { IMongoId } from "models/index"
import { IProject } from "models/Project"

type Error = {}

const fetchProjects = createAsyncAction(
  'FETCH_PROJECTS',
  'FETCH_PROJECTS_SUCCEEDED',
  'REQUEST_FAILED',
)<string, IProject[], Error>()

const updateProject = createAsyncAction(
  'UPDATE_PROJECT',
  'UPDATE_PROJECT_SUCCEEDED',
  'REQUEST_FAILED',
)<IProject, IProject, Error>()

const createProject = createAsyncAction(
  'CREATE_PROJECT',
  'CREATE_PROJECT_SUCCEEDED',
  'REQUEST_FAILED',
)<any, IProject, Error>()
// 'CREATE_PROJECT', type for project draft

const deleteProject = createAsyncAction(
  'DELETE_PROJECT',
  'DELETE_PROJECT_SUCCEEDED',
  'REQUEST_FAILED',
)<IMongoId, IMongoId, Error>()

export default {
  fetchProjects,
  updateProject,
  createProject,
  deleteProject,
}
