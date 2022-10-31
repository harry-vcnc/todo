import { fork, put, take, takeLeading } from 'typed-redux-saga';
import { RequestDeleteToDoAction, todoActions } from '../slice';
import { fetchDeleteToDo } from './apis';

export function* deleteToDoSaga(action: RequestDeleteToDoAction) {
  yield* fork(fetchDeleteToDo, action);
  const result = yield* take([
    todoActions.successDeleteToDoApi,
    todoActions.failureDeleteToDoApi,
  ]);

  if (result.type === todoActions.failureDeleteToDoApi.type) {
    yield* put(todoActions.failureDeleteToDo());
    return;
  }

  yield* put(todoActions.successDeleteToDo(result.payload));
}

export const deleteToDoWatcher = takeLeading(
  todoActions.requestDeleteToDo,
  deleteToDoSaga,
);
