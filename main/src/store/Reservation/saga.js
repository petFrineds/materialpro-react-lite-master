import { SET_RESERVATION_LIST_SAGA, SET_RESERVATION_LIST_SUCESS } from '.';
import { delay, put, takeEvery, call } from 'redux-saga/effects';

import { getUserImg } from '../../api/AuthApi';

function* setMyReserveListSaga(action) {
  try {
    const result = yield call(getUserImg, action.data.userId);
    if (result.status === 200) {
      yield put({
        type: SET_RESERVATION_LIST_SUCESS,
        data: { userImg: result.data.userimage, id: action.data.id },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* reservationSaga() {
  yield takeEvery(SET_RESERVATION_LIST_SAGA, setMyReserveListSaga);
}
