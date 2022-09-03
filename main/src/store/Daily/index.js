import { fromJS } from 'immutable';

//Action 정의
const SET_DAILY_LIST = 'DAILY/SET_DAILY_LIST';

//초기 상태 정의
const initialState = fromJS({
  dailyList: undefined,
});

//Action 생성 함수 정의
export const setDailyList = dailyList => ({
  type: SET_DAILY_LIST,
  data: dailyList,
});

//리듀서 함수 만들기
const dogWalker = (state = initialState, action) => {
  switch (action.type) {
    case SET_DAILY_LIST:
      console.log(action);
      return state.set('dailyList', action.data);
    default:
      return state;
  }
};
export default dogWalker;
