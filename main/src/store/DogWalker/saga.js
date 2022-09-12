import { SET_DOGWALKER_LIST_SAGA, SET_DOGWALKER_LIST_SUCCESS } from '.';
import { delay, put, takeEvery, call } from 'redux-saga/effects';

import { getUserImg } from '../../api/AuthApi';

function* setDogWalkerListSaga(action) {
  try {
    const result = yield call(getUserImg, action.data.userId);
    if (result.status === 200) {
      yield put({
        type: SET_DOGWALKER_LIST_SUCCESS,
        data: { userImg: result.data.userimage, id: action.data.id },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* dogwalkerSaga() {
  yield takeEvery(SET_DOGWALKER_LIST_SAGA, setDogWalkerListSaga);
}
