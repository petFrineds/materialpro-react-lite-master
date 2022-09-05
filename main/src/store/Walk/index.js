import { fromJS } from 'immutable';

//Action 정의
const SET_WALK_INFO = 'WALK/SET_WALK_INFO';
const SET_MY_WALK_LIST = 'WALK/SET_MY_WALK_LIST';

//초기 상태 정의
const initialState = fromJS({
  walkInfo: undefined,
  myWalkList: undefined,
});

//Action 생성 함수 정의
export const setWalkInfo = walkInfo => ({
  type: SET_WALK_INFO,
  data: walkInfo,
});
export const setMyWalkList = myWalkList => ({
  type: SET_MY_WALK_LIST,
  data: myWalkList,
});
//리듀서 함수 만들기
const walk = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALK_INFO:
      return state.set('walkInfo', action.data);
    case SET_MY_WALK_LIST:
      return state.set('myWalkList', action.data);
    default:
      return state;
  }
};
export default walk;
