import { fromJS } from 'immutable';

//Action 정의
const SET_DOGWALKER_LIST = 'DOGWALKER/SET_DOGWALKER_LIST';
export const SET_DOGWALKER_LIST_SUCCESS =
  'DOGWALKER/SET_DOGWALKER_LIST_SUCCESS';
export const SET_DOGWALKER_LIST_SAGA = 'DOGWALKER/SET_DOGWALKER_LIST_SAGA';
const SET_DOGWALKER_SCHEDULE_INFO = 'DOGWALKER/SET_DOGWALKER_SCHEDULE_INFO ';
const SET_DOGWALKER_INFO = 'DOGWALKER/SET_DOGWALKER_INFO ';

//초기 상태 정의
const initialState = fromJS({
  dogWalkerList: undefined,
  dogwalkerScheduleInfo: undefined,
  dogwalkerInfo: undefined,
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
export const setDogwalkerInfo = dogwalkerInfo => ({
  type: SET_DOGWALKER_INFO,
  data: dogwalkerInfo,
});

//리듀서 함수 만들기
const dogWalker = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOGWALKER_LIST:
      return state.set('dogWalkerList', action.data);
    case SET_DOGWALKER_LIST_SUCCESS:
      const newRow = state
        .get('dogWalkerList')
        .map(item =>
          item.id === action.data.id
            ? { ...item, userImage: action.data.userImg }
            : item
        );
      return state.set('dogWalkerList', newRow);
    case SET_DOGWALKER_SCHEDULE_INFO:
      return state.set('dogwalkerScheduleInfo', action.data);
    case SET_DOGWALKER_INFO:
      return state.set('dogwalkerInfo', action.data);
    default:
      return state;
  }
};
export default dogWalker;
