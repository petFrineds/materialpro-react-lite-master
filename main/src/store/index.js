import { combineReducers } from 'redux';
import dogWalker, { dogwalkerSaga } from './DogWalker/index';
import user from './User/index';
import payment from './Payment/index';
import reservation from './Reservation/index';
import daily from './Daily/index';
import mypage from './Mypage/index';
import walk from './Walk/index';
import alarm from './Alarm';
import { all } from 'redux-saga/effects';

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드입니다.
// store에 저장되는 리듀서는 오직 1개입니다.
const rootReducer = combineReducers({
  dogWalker,
  user,
  payment,
  reservation,
  daily,
  mypage,
  walk,
  alarm,
});
export function* rootSaga() {
  yield all([dogwalkerSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;
