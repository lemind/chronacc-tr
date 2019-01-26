import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { tasksReducer, tasksEpics } from './tasks/index';
import { projectsReducer, projectsEpics } from './projects/index';

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer
});

export const rootEpic = combineEpics(
  tasksEpics.fetchTasksEpic,
  tasksEpics.addTaskEpic,
  tasksEpics.updateTaskEpic,
  tasksEpics.deleteTaskEpic,
  projectsEpics.fetchProjectsEpic
);
