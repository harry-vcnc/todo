import { fork, put, take, takeLatest } from 'typed-redux-saga';
import { RequestDeleteToDoAction, todoActions } from '../slice';
import { fetchDeleteToDo } from './apis';

export function* deleteToDoSaga(action: RequestDeleteToDoAction) {
  const isDeleteConfirmed = window.confirm('삭제하시겠습니까?');
  if (!isDeleteConfirmed) {
    yield* put(todoActions.cancelDeleteToDo());
    return;
  }

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

// api watcher?
// 어떤 흐름을 통제하느냐에 따라 takeEvery latest등이 달라질 수 있다
// 그러므로 api는 그대로 두고 이것을 호출하는 사가에서 통제하는 것으로 하는게 좋음
// 즉 api watcher는 필요 없음

// 진입점과 끝나는 지점이 단 하나씩
// 진입점은 UI로 생각하면 되고 끝내는 지점은 사가에서 끝낼 것이다
// 즉 지금처럼 사가에서 본인을 부르면 진입점이 여러 개인 형태

export const deleteToDoWatcher = takeLatest(
  todoActions.requestDeleteToDo.type,
  deleteToDoSaga,
);
