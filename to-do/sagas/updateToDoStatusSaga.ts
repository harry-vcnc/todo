import { TODO_API_URL } from '@root/constants/urls';
import axios from 'axios';
import { call, fork, put, take, takeLeading } from 'typed-redux-saga';
import { RequestUpdateToDoStatusAction, todoActions } from '../slice';

export function* fetchUpdateToDo(action: RequestUpdateToDoStatusAction) {
  try {
    const response = yield* call(() =>
      axios.patch(`${TODO_API_URL}/${action.payload.id}/status`, {
        status: action.payload.status,
      }),
    );
    yield* put(todoActions.successUpdateToDoStatusApi(response.data));
  } catch (error) {
    yield* put(todoActions.failureUpdateToDoStatusApi());
  }
}

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
