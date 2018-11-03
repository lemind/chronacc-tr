import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { tasksReducer, tasksEpics } from './tasks/index';

export const rootReducer = combineReducers({
  tasks: tasksReducer
});

export const rootEpic = combineEpics(
  tasksEpics.fetchTasksEpic
);
