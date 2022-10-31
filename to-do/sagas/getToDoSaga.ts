import { TODO_API_URL } from '@root/constants/urls';
import axios from 'axios';
import { call, fork, put, take, takeLeading } from 'typed-redux-saga';
import { todoActions } from '../slice';

function* fetchGetToDoApi() {
  try {
    const response = yield* call(() => axios.get(TODO_API_URL));
    yield* put(todoActions.successGetToDoApi(response.data));
  } catch (error) {
    yield* put(todoActions.failureGetToDoApi());
  }
}

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
