import { fork, put, take, takeLatest } from 'typed-redux-saga';
import { RequestDeleteToDoAction, todoActions } from '../slice';
import { fetchDeleteToDo } from './apis';

export function* deleteToDoSaga(action: RequestDeleteToDoAction) {
  yield* fork(fetchDeleteToDo, action);
  const result = yield* take([
    todoActions.successDeleteToDoApi,
    todoActions.failureDeleteToDoApi,
  ]);

  if (result.type === todoActions.failureDeleteToDoApi.type) {
    const isDeleteConfirmed = window.confirm(
      '삭제에 실패했습니다. 다시 시도하겠습니까?',
    );
    if (isDeleteConfirmed) {
      yield* put(todoActions.requestDeleteToDo(action.payload));
    }
    yield* put(todoActions.failureDeleteToDo());
    return;
  }

  yield* put(todoActions.successDeleteToDo());
}

export const deleteToDoWatcher = takeLatest(
  todoActions.requestDeleteToDo,
  deleteToDoSaga,
);
