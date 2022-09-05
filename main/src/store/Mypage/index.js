import { fromJS } from 'immutable';

//Action 정의
const SET_MY_DOGWALKER_LIST = 'MYPAGE/SET_MY_DOGWALKER_LIST';
const SET_MY_RESERVE_LIST = 'MYPAGE/SET_MY_RESERVE_LIST';

//초기 상태 정의
const initialState = fromJS({
  myDogwalkerList: undefined,
  myReserveList: undefined,
});

//Action 생성 함수 정의
export const setMyDogwalkerList = myDogwalkerList => ({
  type: SET_MY_DOGWALKER_LIST,
  data: myDogwalkerList,
});
export const setMyReserveList = myReserveList => ({
  type: SET_MY_RESERVE_LIST,
  data: myReserveList,
});

//리듀서 함수 만들기
const mypage = (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_DOGWALKER_LIST:
      return state.set('myDogwalkerList', action.data);
    case SET_MY_RESERVE_LIST:
      return state.set('myReserveList', action.data);
    default:
      return state;
  }
};
export default mypage;
