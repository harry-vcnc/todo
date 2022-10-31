import { fork, put, take, takeLeading } from 'typed-redux-saga';
import { todoActions } from '../slice';
import { fetchGetToDoApi } from './apis';

export function* getToDoSaga() {
  yield* fork(fetchGetToDoApi);
  const result = yield* take([
    todoActions.successGetToDoApi,
    todoActions.failureGetToDoApi,
  ]);

  if (result === todoActions.failureGetToDoApi.type) {
    yield* put(todoActions.failureGetToDo());
    return;
  }

  yield* put(todoActions.successGetToDo(result.payload));
}

export const getToDoWatcher = takeLeading(
  todoActions.requestGetToDo,
  getToDoSaga,
);
