import { addToDoWatcher } from './addToDoSaga';
import { deleteToDoWatcher } from './deleteToDoSaga';
import { getToDoWatcher } from './getToDoSaga';
import { updateToDoStatusWatcher } from './updateToDoStatusSaga';

export const toDoWatcher = [
  addToDoWatcher,
  getToDoWatcher,
  updateToDoStatusWatcher,
  ...deleteToDoWatcher,
];
