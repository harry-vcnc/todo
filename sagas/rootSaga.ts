import { popUpWatcher } from '@root/pop-up/sagas/watcher';
import { toDoWatcher } from '@root/to-do/sagas/watcher';
import { all } from 'typed-redux-saga';

export function* rootSaga() {
  // 배열 순서대로 동기적으로 처리할 순 없을끼?
  yield* all([...toDoWatcher, ...popUpWatcher]);
}
