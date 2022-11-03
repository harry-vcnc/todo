import { fork, put, take, takeLatest, takeLeading } from 'typed-redux-saga';
import { RequestDeleteToDoAction, todoActions } from '../slice';
import { fetchDeleteToDo } from './apis';

export function* deleteToDoSaga(action: RequestDeleteToDoAction) {
  const isDeleteConfirmed = window.confirm('삭제하시겠습니까?');
  if (!isDeleteConfirmed) {
    yield* put(todoActions.failureDeleteToDo());
    return;
  }

  yield* fork(fetchDeleteToDo, action);
  const result = yield* take([
    todoActions.successDeleteToDoApi,
    todoActions.failureDeleteToDoApi,
  ]);

  if (result.type === todoActions.failureDeleteToDoApi.type) {
    yield* put(todoActions.failureDeleteToDo());
    yield* put(todoActions.requestRetryDeleteToDo(action.payload));
    return;
  }

  yield* put(todoActions.successDeleteToDo());
}

function* retryDeleteToDoSaga(action: RequestDeleteToDoAction) {
  const isRetryConfirmed = window.confirm(
    '삭제에 실패했습니다. 다시 시도하겠습니까?',
  );
  if (!isRetryConfirmed) {
    yield* put(todoActions.failureRetryDeleteToDo());
    return;
  }

  yield* fork(fetchDeleteToDo, action);
  const result = yield* take([
    todoActions.successDeleteToDoApi,
    todoActions.failureDeleteToDoApi,
  ]);

  if (result.type === todoActions.failureDeleteToDoApi.type) {
    yield* put(todoActions.requestRetryDeleteToDo(action.payload));
    return;
  }

  yield* put(todoActions.successRetryDeleteToDo());
}

// api watcher?
// 어떤 흐름을 통제하느냐에 따라 takeEvery latest등이 달라질 수 있다
// 그러므로 api는 그대로 두고 이것을 호출하는 사가에서 통제하는 것으로 하는게 좋음
// 즉 api watcher는 필요 없음

// 진입점과 끝나는 지점이 단 하나씩
// 진입점은 UI로 생각하면 되고 끝내는 지점은 사가에서 끝낼 것이다
// 즉 지금처럼 사가에서 본인을 부르면 진입점이 여러 개인 형태

// 근데 유저가 자의적으로 캔슬하는 경우 failure로 두어야 하나?
// 그냥 success failure boolean하게 시작과 끝으로 두고, 그 안에 children으로 들어가는 형식으로
// 왜냐? 그것은 UI적인 사고 -> saga에서는 '실행 흐름'의 성공 or 실패로 사고해야
// 사실 그런 식으로 작성하다보면 confirm, deny, decline 등등등 유저 동작에 따라 액션이 너무 많아짐

export const deleteToDoWatcher = [
  takeLeading(todoActions.requestDeleteToDo.type, deleteToDoSaga),
  takeLatest(todoActions.requestRetryDeleteToDo.type, retryDeleteToDoSaga),
];
