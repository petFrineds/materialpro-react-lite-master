import { fromJS } from 'immutable';

//Action 정의
const SET_RESERVATION_LIST = 'RESERVATION/SET_RESERVATION_LIST';

//초기 상태 정의
const initialState = fromJS({
  reservationList: undefined,
});

//Action 생성 함수 정의
export const setDogWalkerList = reservationList => ({
  type: SET_RESERVATION_LIST,
  data: reservationList,
});

//리듀서 함수 만들기
const reservation = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESERVATION_LIST:
      console.log(action);
      return state.set('reservationList', action.data);
    default:
      return state;
  }
};
export default reservation;
