import { RequestAddToDoActionType, todoActions } from '@root/to-do/slice';
import { fork, put, take, takeLeading } from 'typed-redux-saga';
import { fetchAddToDo } from './apis';

export function* addToDoSaga(action: RequestAddToDoActionType) {
  yield* fork(fetchAddToDo, action);
  const result = yield* take([
    todoActions.successAddToDoApi.type,
    todoActions.failureAddToDoApi.type,
  ]);

  if (result.type === todoActions.failureAddToDoApi.type) {
    yield* put(todoActions.failureAddToDo());
    return;
  }

  yield* put(todoActions.successAddToDo());
}

export const addToDoWatcher = takeLeading(
  todoActions.requestAddToDo,
  addToDoSaga,
);
