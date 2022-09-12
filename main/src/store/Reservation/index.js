import { fromJS } from 'immutable';

//Action 정의
const SET_RESERVATION_LIST = 'RESERVATION/SET_RESERVATION_LIST';
export const SET_RESERVATION_LIST_SAGA =
  'RESERVATION/SET_RESERVATION_LIST_SAGA';
export const SET_RESERVATION_LIST_SUCESS =
  'RESERVATION/SET_RESERVATION_LIST_SUCESS';
const SET_RESERVATION_DETAILID = 'RESERVATION/SET_RESERVATION_DETAILID';
const SET_RESERVATION_INFO = 'RESERVATION/SET_RESERVATION_INFO';

//초기 상태 정의
const initialState = fromJS({
  reservationList: undefined,
  reservationDetailId: undefined,
  reservationInfo: undefined,
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
export const setReservationInfo = reservationInfo => ({
  type: SET_RESERVATION_INFO,
  data: reservationInfo,
});
//리듀서 함수 만들기
const reservation = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESERVATION_LIST:
      return state.set('reservationList', action.data);
    case SET_RESERVATION_LIST_SUCESS:
      const newRow = state
        .get('reservationList')
        .map(item =>
          item.reservedId === action.data.id
            ? { ...item, userImage: action.data.userImg }
            : item
        );
      return state.set('reservationList', newRow);
    case SET_RESERVATION_DETAILID:
      return state.set('reservationDetailId', action.data);
    case SET_RESERVATION_INFO:
      return state.set('reservationInfo', action.data);
    default:
      return state;
  }
};
export default reservation;
