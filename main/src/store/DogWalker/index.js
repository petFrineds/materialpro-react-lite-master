import { fromJS } from 'immutable';

//Action 정의
const SET_DOGWALKER_LIST = 'DOGWALKER/SET_DOGWALKER_LIST';
const SET_DOGWALKER_SCHEDULE_INFO = 'DOGWALKER/SET_DOGWALKER_SCHEDULE_INFO ';

//초기 상태 정의
const initialState = fromJS({
  dogWalkerList: undefined,
  dogwalkerScheduleInfo: undefined,
});

//Action 생성 함수 정의
export const setDogWalkerList = dogWalkerList => ({
  type: SET_DOGWALKER_LIST,
  data: dogWalkerList,
});
export const setDogwalkerScheduleInfo = dogwalkerScheduleInfo => ({
  type: SET_DOGWALKER_SCHEDULE_INFO,
  data: dogwalkerScheduleInfo,
});

//리듀서 함수 만들기
const dogWalker = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOGWALKER_LIST:
      return state.set('dogWalkerList', action.data);
    case SET_DOGWALKER_SCHEDULE_INFO:
      console.log('>???');
      return state.set('dogwalkerScheduleInfo', action.data);
    default:
      return state;
  }
};
export default dogWalker;
