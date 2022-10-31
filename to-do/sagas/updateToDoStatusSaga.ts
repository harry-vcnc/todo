import { fork, put, take, takeLeading } from 'typed-redux-saga';
import { RequestUpdateToDoStatusAction, todoActions } from '../slice';
import { fetchUpdateToDo } from './apis';

export function* updateToDoStatusSaga(action: RequestUpdateToDoStatusAction) {
  yield* fork(fetchUpdateToDo, action);
  const result = yield* take([
    todoActions.successUpdateToDoStatusApi,
    todoActions.failureUpdateToDoStatusApi,
  ]);

  if (result.type === todoActions.failureUpdateToDoStatusApi.type) {
    yield* put(todoActions.failureUpdateToDoStatus());
    return;
  }

  yield* put(todoActions.successUpdateToDoStatus(result.payload));
}

export const updateToDoStatusWatcher = takeLeading(
  todoActions.requestUpdateToDoStatus,
  updateToDoStatusSaga,
);
