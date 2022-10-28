import { toDoWatcher } from '@root/to-do/sagas/watcher';
import { all } from 'typed-redux-saga';

export function* rootSaga() {
  yield all([...toDoWatcher]);
}
