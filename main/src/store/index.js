import { combineReducers } from 'redux';
import dogWalker from './DogWalker/index';
import user from './User/index';
import payment from './Payment/index';
import reservation from './Reservation/index';
import daily from './Daily/index';
import mypage from './Mypage/index';
import walk from './Walk';

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
});

export default rootReducer;
