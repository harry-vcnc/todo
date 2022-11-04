import { toDoWatcher } from '@root/features/to-do/sagas/watcher';
import { all } from 'typed-redux-saga';

export function* rootSaga() {
  yield* all([...toDoWatcher]);
}
