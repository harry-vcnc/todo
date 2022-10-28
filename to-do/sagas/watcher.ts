import { addToDoWatcher } from './addToDoSaga';
import { getToDoWatcher } from './getToDoSaga';

export const toDoWatcher = [addToDoWatcher, getToDoWatcher];
