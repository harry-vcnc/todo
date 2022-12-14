import { popUpActions } from '@root/features/pop-up/slice';
import { fork, put, take, takeEvery, takeLeading } from 'typed-redux-saga';
import { RequestDeleteToDoActionType, todoActions } from '../slice';
import { fetchDeleteToDo } from './apis';

export function* deleteToDoSaga(action: RequestDeleteToDoActionType) {
  yield* put(popUpActions.openPopUp({ content: '삭제하시겠습니까?' }));
  const popUpResult = yield* take([
    popUpActions.confirmPopUp.type,
    popUpActions.cancelPopUp.type,
  ]);
  if (popUpResult.type === popUpActions.cancelPopUp.type) {
    yield* put(todoActions.failureDeleteToDo());
    return;
  }

  yield* fork(fetchDeleteToDo, action);
  const apiResult = yield* take([
    todoActions.successDeleteToDoApi.type,
    todoActions.failureDeleteToDoApi.type,
  ]);
  if (apiResult.type === todoActions.failureDeleteToDoApi.type) {
    yield* put(todoActions.failureDeleteToDo());
    yield* put(todoActions.requestRetryDeleteToDo(action.payload));
    return;
  }

  yield* put(todoActions.successDeleteToDo());
}

function* retryDeleteToDoSaga(action: RequestDeleteToDoActionType) {
  yield* put(
    popUpActions.openPopUp({
      content: '삭제에 실패했습니다. 다시 시도하겠습니까?',
    }),
  );
  const popUpResult = yield* take([
    popUpActions.confirmPopUp.type,
    popUpActions.cancelPopUp.type,
  ]);
  if (popUpResult.type === popUpActions.cancelPopUp.type) {
    yield* put(todoActions.failureRetryDeleteToDo());
    return;
  }

  yield* fork(fetchDeleteToDo, action);
  const apiResult = yield* take([
    todoActions.successDeleteToDoApi.type,
    todoActions.failureDeleteToDoApi.type,
  ]);
  if (apiResult.type === todoActions.failureDeleteToDoApi.type) {
    yield* put(popUpActions.closePopUp());
    yield* put(todoActions.requestRetryDeleteToDo(action.payload));
    return;
  }
  yield* put(todoActions.successRetryDeleteToDo());
}

export const deleteToDoWatcher = [
  takeLeading(todoActions.requestDeleteToDo.type, deleteToDoSaga),
  // if)) request가 takeLeading이 아니라 takeEvery였다면
  // retry가 takeLatest 따위면 무시되는 액션이 발생하므로
  // takeEvery가 옳다
  takeEvery(todoActions.requestRetryDeleteToDo.type, retryDeleteToDoSaga),
];
