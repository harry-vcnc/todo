import { TODO_API_URL } from '@root/constants/urls';
import axios from 'axios';
import { call, fork, put, take, takeLeading } from 'typed-redux-saga';
import { RequestDeleteToDoAction, todoActions } from '../slice';

export function* fetchDeleteToDo(action: RequestDeleteToDoAction) {
  try {
    const response = yield* call(() =>
      axios.delete(`${TODO_API_URL}/${action.payload.id}`),
    );
    yield* put(todoActions.successDeleteToDoApi(response.data));
  } catch (error) {
    yield* put(todoActions.failureDeleteToDoApi());
  }
}

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
