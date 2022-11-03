import { PayloadAction } from '@reduxjs/toolkit';
import { fork, put, take, takeLeading } from 'typed-redux-saga';
import { todoActions, ToDoIdStatus } from '../slice';
import { fetchUpdateToDo } from './apis';

export function* updateToDoStatusSaga(action: PayloadAction<ToDoIdStatus>) {
  yield* fork(fetchUpdateToDo, action);
  const result = yield* take([
    todoActions.successUpdateToDoStatusApi.type,
    todoActions.failureUpdateToDoStatusApi.type,
  ]);

  if (result.type === todoActions.failureUpdateToDoStatusApi.type) {
    yield* put(todoActions.failureUpdateToDoStatus());
    return;
  }

  yield* put(todoActions.successUpdateToDoStatus());
}

export const updateToDoStatusWatcher = takeLeading(
  todoActions.requestUpdateToDoStatus,
  updateToDoStatusSaga,
);
