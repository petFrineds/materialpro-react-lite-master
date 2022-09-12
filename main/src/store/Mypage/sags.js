import {
  SET_MY_DOGWALKER_LIST_SAGA,
  SET_MY_DOGWALKER_LIST_SUCCESS,
  SET_MY_RESERVE_LIST_SAGA,
  SET_MY_RESERVE_LIST_SUCCESS,
} from '.';
import { delay, put, takeEvery, call } from 'redux-saga/effects';

import { getUserImg } from '../../api/AuthApi';

function* setMyReserveListSaga(action) {
  try {
    const result = yield call(getUserImg, action.data.userId);
    if (result.status === 200) {
      yield put({
        type: SET_MY_RESERVE_LIST_SUCCESS,
        data: { userImg: result.data.userimage, id: action.data.id },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
function* setMyDogWalkerListSaga(action) {
  try {
    const result = yield call(getUserImg, action.data.userId);
    if (result.status === 200) {
      yield put({
        type: SET_MY_DOGWALKER_LIST_SUCCESS,
        data: { userImg: result.data.userimage, id: action.data.id },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* myPageSaga() {
  yield takeEvery(SET_MY_RESERVE_LIST_SAGA, setMyReserveListSaga);
  yield takeEvery(SET_MY_DOGWALKER_LIST_SAGA, setMyDogWalkerListSaga);
}
