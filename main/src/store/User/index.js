import { fromJS } from 'immutable';

//Action 정의
const SET_USER_INFO = 'USER/SET_USER_INFO';

//초기 상태 정의
const initialState = fromJS({
  userInfo: undefined,
});

//Action 생성 함수 정의
export const setUserInfo = userInfo => ({
  type: SET_USER_INFO,
  data: userInfo,
});

//리듀서 함수 만들기
const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return state.set('userInfo', action.data);
    default:
      return state;
  }
};
export default user;
