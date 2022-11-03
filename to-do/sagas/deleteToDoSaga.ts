import { fork, put, take, takeLatest, takeLeading } from 'typed-redux-saga';
import { RequestDeleteToDoActionType, todoActions } from '../slice';
import { fetchDeleteToDo } from './apis';

export function* deleteToDoSaga(action: RequestDeleteToDoActionType) {
  const isDeleteConfirmed = window.confirm('삭제하시겠습니까?');
  if (!isDeleteConfirmed) {
    yield* put(todoActions.failureDeleteToDo());
    return;
  }

  yield* fork(fetchDeleteToDo, action);
  const result = yield* take([
    todoActions.successDeleteToDoApi.type,
    todoActions.failureDeleteToDoApi.type,
  ]);

  if (result.type === todoActions.failureDeleteToDoApi.type) {
    yield* put(todoActions.failureDeleteToDo());
    yield* put(todoActions.requestRetryDeleteToDo(action.payload));
    return;
  }

  yield* put(todoActions.successDeleteToDo());
}

function* retryDeleteToDoSaga(action: RequestDeleteToDoActionType) {
  const isRetryConfirmed = window.confirm(
    '삭제에 실패했습니다. 다시 시도하겠습니까?',
  );
  if (!isRetryConfirmed) {
    yield* put(todoActions.failureRetryDeleteToDo());
    return;
  }

  yield* fork(fetchDeleteToDo, action);
  const result = yield* take([
    todoActions.successDeleteToDoApi.type,
    todoActions.failureDeleteToDoApi.type,
  ]);

  if (result.type === todoActions.failureDeleteToDoApi.type) {
    yield* put(todoActions.requestRetryDeleteToDo(action.payload));
    return;
  }

  yield* put(todoActions.successRetryDeleteToDo());
}

export const deleteToDoWatcher = [
  takeLeading(todoActions.requestDeleteToDo.type, deleteToDoSaga),
  takeLatest(todoActions.requestRetryDeleteToDo.type, retryDeleteToDoSaga),
];
