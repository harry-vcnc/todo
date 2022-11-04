import { PayloadAction } from '@reduxjs/toolkit';
import { TODO_API_URL } from '@root/constants/urls';
import {
  RequestAddToDoActionType,
  RequestDeleteToDoActionType,
  RequestUpdateToDoActionType,
  todoActions,
  ToDoIdStatus,
} from '@root/to-do/slice';
import axios from 'axios';
import { call, put } from 'typed-redux-saga';

export function* fetchAddToDo(action: RequestAddToDoActionType) {
  try {
    const response = yield* call(() =>
      axios.post(TODO_API_URL, {
        title: action.payload.title,
        description: action.payload.description,
      }),
    );
    yield* put(todoActions.successAddToDoApi(response.data));
  } catch (error) {
    yield* put(todoActions.failureAddToDoApi());
  }
}

export function* fetchDeleteToDo(action: RequestDeleteToDoActionType) {
  try {
    const response = yield* call(() =>
      axios.delete(`${TODO_API_URL}/${action.payload.id}`),
    );
    yield* put(todoActions.successDeleteToDoApi(response.data));
  } catch (error) {
    yield* put(todoActions.failureDeleteToDoApi());
  }
}

export function* fetchGetToDoApi() {
  try {
    const response = yield* call(() => axios.get(TODO_API_URL));
    yield* put(todoActions.successGetToDoApi(response.data));
  } catch (error) {
    yield* put(todoActions.failureGetToDoApi());
  }
}

export function* fetchUpdateToDo(action: RequestUpdateToDoActionType) {
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
