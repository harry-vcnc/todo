import { RequestAddToDoAction, todoActions } from '@root/to-do/slice';
import { call, fork, put, take, takeLeading } from 'typed-redux-saga';
import axios from 'axios';
import { TODO_API_URL } from '@root/constants/urls';
import { ToDoItem } from '../types';

type dd = Pick<RequestAddToDoAction, 'payload'>;
function* fetchAddToDoApi({ title, description }: dd) {
  try {
    const response = yield* call(() =>
      axios.post(TODO_API_URL, { title, description }),
    );
    yield* put(todoActions.successAddToDoApi(response.data));
  } catch (error) {
    yield* put(todoActions.failureAddToDoApi());
  }
}

export function* addToDoSaga({
  payload: { title, description },
}: RequestAddToDoAction) {
  yield* fork(fetchAddToDoApi, { title, description });
  const actions = yield* take([
    todoActions.successAddToDoApi,
    todoActions.failureAddToDoApi,
  ]);
  if (actions.type === todoActions.successAddToDoApi.type) {
    yield* put(todoActions.successAddToDo());
  } else {
    yield* put(todoActions.failureAddToDo());
  }
}

export const addToDoWatcher = takeLeading(
  todoActions.requestAddToDo,
  addToDoSaga,
);
