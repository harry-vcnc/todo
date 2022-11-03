import { put, take, takeLeading } from 'typed-redux-saga';
import { popUpActions } from '../slice';

function* requestPopUpSaga() {
  yield* put(popUpActions.openPopUp());
  yield* take([popUpActions.onConfirm.type, popUpActions.onCancel.type]);
  yield* put(popUpActions.closePopUp());
}

export const requestPopUpWatcher = takeLeading(
  popUpActions.requestPopUp.type,
  requestPopUpSaga,
);
