import { fromJS } from 'immutable';

//Action 정의
const SET_DAILY_LIST = 'DAILY/SET_DAILY_LIST';
const SET_DAILY_INFO = 'DAILY/SET_DAILY_INFO';

//초기 상태 정의
const initialState = fromJS({
  dailyList: undefined,
  dailyInfo: undefined,
});

//Action 생성 함수 정의
export const setDailyList = dailyList => ({
  type: SET_DAILY_LIST,
  data: dailyList,
});
export const setDailyInfo = dailyInfo => ({
  type: SET_DAILY_INFO,
  data: dailyInfo,
});

//리듀서 함수 만들기
const daily = (state = initialState, action) => {
  switch (action.type) {
    case SET_DAILY_LIST:
      return state.set('dailyList', action.data);
    case SET_DAILY_INFO:
      return state.set('dailyInfo', action.data);
    default:
      return state;
  }
};
export default daily;
