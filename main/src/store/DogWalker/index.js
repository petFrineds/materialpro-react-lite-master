import { fromJS } from 'immutable';

//Action 정의
const SET_DOGWALKER_LIST = 'DOGWALKER/SET_DOGWALKER_LIST';

//초기 상태 정의
const initialState = fromJS({
  dogWalkerList: undefined,
});

//Action 생성 함수 정의
export const setDogWalkerList = dogWalkerList => ({
  type: SET_DOGWALKER_LIST,
  data: dogWalkerList,
});

//리듀서 함수 만들기
const dogWalker = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOGWALKER_LIST:
      console.log(action);
      return state.set('dogWalkerList', action.data);
    default:
      return state;
  }
};
export default dogWalker;
