import { put, take, takeLeading } from 'typed-redux-saga';
import { popUpActions } from '../slice';

function* initPopUpSaga() {
  yield* take([popUpActions.onConfirm.type, popUpActions.onCancel.type]);
  yield* put(popUpActions.closePopUp());
}

export const initPopUpWatcher = takeLeading(
  popUpActions.initPopUp.type,
  initPopUpSaga,
);
