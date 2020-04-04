import { createAsyncAction } from 'typesafe-actions';

import { IMongoId } from "models/index"
import { IProject } from "models/Project"

type Error = {}

const fetchProjects = createAsyncAction(
  'FETCH_PROJECTS',
  'FETCH_PROJECTS_SUCCEEDED',
  'REQUEST_FAILED',
)<string, IProject[], Error>();

const updateProject = createAsyncAction(
  'UPDATE_PROJECT',
  'UPDATE_PROJECT_SUCCEEDED',
  'REQUEST_FAILED',
)<IProject, IProject, Error>();

const createProject = createAsyncAction(
  'CREATE_PROJECT',
  'CREATE_PROJECT_SUCCEEDED',
  'REQUEST_FAILED',
)<any, IProject, Error>();
// 'CREATE_PROJECT', type for project draft

const deleteProject = createAsyncAction(
  'DELETE_PROJECT',
  'DELETE_PROJECT_SUCCEEDED',
  'REQUEST_FAILED',
)<IMongoId, IMongoId, Error>();

export const actions = {
  fetchProjects,
  updateProject,
  createProject,
  deleteProject,
}

// console.log('___', fetchProjectsAsync.request(''));
// console.log('___', fetchProjectsAsync.success([]));
// console.log('___', deleteProjectsAsync.failure(34));

export const actionsOld = {
  fetchProjects: () => ({
    type: 'FETCH_PROJECTS'
  }),
  fetchProjectsSucceeded: (payload) => {
    return {
      type: 'FETCH_PROJECTS_SUCCEEDED',
      payload: payload
    }
  },
  requestFailed: (error) => ({
    type: 'REQUEST_FAILED',
    payload: {...error}
  }),
  updateProject: (project) => ({
    type: 'UPDATE_PROJECT',
    project
  }),
  updateProjectSucceeded: (payload) => {
    return {
      type: 'UPDATE_PROJECT_SUCCEEDED',
      payload: payload
    }
  },
  deleteProjectSucceeded: () => {
    return {
      type: 'DELETE_PROJECT_SUCCEEDED'
    }
  },
  deleteProject: (projectId) => ({
    type: 'DELETE_PROJECT',
    projectId
  }),
  addProject: (project) => ({
    type: 'CREATE_PROJECT',
    project
  }),
  addProjectSucceeded: (payload) => {
    return {
      type: 'CREATE_PROJECT_SUCCEEDED',
      payload: payload
    }
  },
}
