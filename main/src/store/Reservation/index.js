import { fromJS } from 'immutable';

//Action 정의
const SET_RESERVATION_LIST = 'RESERVATION/SET_RESERVATION_LIST';
const SET_RESERVATION_DETAILID = 'RESERVATION/SET_RESERVATION_DETAILID';

//초기 상태 정의
const initialState = fromJS({
  reservationList: undefined,
  reservationDetailId: undefined,
});

//Action 생성 함수 정의
export const setReservationList = reservationList => ({
  type: SET_RESERVATION_LIST,
  data: reservationList,
});
//Action 생성 함수 정의
export const setReservationDetailId = reservationDetailId => ({
  type: SET_RESERVATION_DETAILID,
  data: reservationDetailId,
});
//리듀서 함수 만들기
const reservation = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESERVATION_LIST:
      return state.set('reservationList', action.data);
    case SET_RESERVATION_DETAILID:
      console.log(action.data);
      return state.set('reservationDetailId', action.data);
    default:
      return state;
  }
};
export default reservation;
