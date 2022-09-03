import { fromJS } from 'immutable';

//Action 정의
const SET_WALK_INFO = 'WALK/SET_WALK_INFO';

//초기 상태 정의
const initialState = fromJS({
  walkInfo: undefined,
});

//Action 생성 함수 정의
export const setWalkInfo = walkInfo => ({
  type: SET_WALK_INFO,
  data: walkInfo,
});

//리듀서 함수 만들기
const walk = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALK_INFO:
      return state.set('walkInfo', action.data);
    default:
      return state;
  }
};
export default walk;
