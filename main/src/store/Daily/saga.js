import {
  SET_DAILY_LIST_SAGA,
  SET_DAILY_LIST_SUCCESS,
  SET_MY_DAILY_LIST_SUCCESS,
  SET_MY_DAILY_LIST_SAGA,
} from '.';
import { delay, put, takeEvery, call } from 'redux-saga/effects';

import { getUserImg } from '../../api/AuthApi';

function* setDailyListSaga(action) {
  try {
    const result = yield call(getUserImg, action.data.userId);
    if (result.status === 200) {
      yield put({
        type: SET_DAILY_LIST_SUCCESS,
        data: { userImg: result.data.userimage, id: action.data.id },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
function* setMyDailyListSaga(action) {
  try {
    const result = yield call(getUserImg, action.data.userId);
    if (result.status === 200) {
      yield put({
        type: SET_MY_DAILY_LIST_SUCCESS,
        data: { userImg: result.data.userimage, id: action.data.id },
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* dailySaga() {
  yield takeEvery(SET_DAILY_LIST_SAGA, setDailyListSaga);
  yield takeEvery(SET_MY_DAILY_LIST_SAGA, setMyDailyListSaga);
}
