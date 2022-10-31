import { addToDoWatcher } from './addToDoSaga';
import { getToDoWatcher } from './getToDoSaga';
import { updateToDoStatusWatcher } from './updateToDoStatusSaga';

export const toDoWatcher = [
  addToDoWatcher,
  getToDoWatcher,
  updateToDoStatusWatcher,
];
