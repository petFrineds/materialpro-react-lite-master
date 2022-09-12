import { fromJS } from 'immutable';

//Action 정의
const SET_DAILY_LIST = 'DAILY/SET_DAILY_LIST';
const SET_MY_DAILY_LIST = 'DAILY/SET_MY_DAILY_LIST';
export const SET_MY_DAILY_LIST_SAGA = 'DAILY/SET_MY_DAILY_LIST_SAGA';
export const SET_MY_DAILY_LIST_SUCCESS = 'DAILY/SET_MY_DAILY_LIST_SUCCESS';
export const SET_DAILY_LIST_SAGA = 'DAILY/SET_DAILY_LIST_SAGA';
export const SET_DAILY_LIST_SUCCESS = 'DAILY/SET_DAILY_LIST_SUCCESS';
const SET_DAILY_INFO = 'DAILY/SET_DAILY_INFO';
const SET_MY_DAILY_INFO = 'DAILY/SET_MY_DAILY_INFO';

//초기 상태 정의
const initialState = fromJS({
  dailyList: undefined,
  dailyInfo: undefined,
  myDailyList: undefined,
  myDailyInfo: undefined,
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
export const setMyDailyList = myDailyList => ({
  type: SET_MY_DAILY_LIST,
  data: myDailyList,
});
export const setMyDailyInfo = myDailyInfo => ({
  type: SET_MY_DAILY_INFO,
  data: myDailyInfo,
});
//리듀서 함수 만들기
const daily = (state = initialState, action) => {
  switch (action.type) {
    case SET_DAILY_LIST:
      return state.set('dailyList', action.data);
    case SET_DAILY_LIST_SUCCESS:
      const newRow = state
        .get('dailyList')
        ?.map(item =>
          item.id === action.data.id
            ? { ...item, userImage: action.data.userImg }
            : item
        );
      return state.set('dailyList', newRow);
    case SET_DAILY_INFO:
      return state.set('dailyInfo', action.data);
    case SET_MY_DAILY_LIST:
      return state.set('myDailyList', action.data);
    case SET_MY_DAILY_LIST_SUCCESS:
      const newDailyRow = state
        .get('myDailyList')
        ?.map(item =>
          item.id === action.data.id
            ? { ...item, userImage: action.data.userImg }
            : item
        );
      return state.set('myDailyList', newDailyRow);
    case SET_MY_DAILY_INFO:
      return state.set('myDailyInfo', action.data);
    default:
      return state;
  }
};
export default daily;
