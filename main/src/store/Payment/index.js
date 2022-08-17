import { fromJS } from 'immutable';

//Action 정의
const SET_PAYMENT_LIST = 'PAYMENT/SET_PAYMENT_LIST';

//초기 상태 정의
const initialState = fromJS({
  paymentList: undefined,
});

//Action 생성 함수 정의
export const setPaymentList = paymentList => ({
  type: SET_PAYMENT_LIST,
  data: paymentList,
});

//리듀서 함수 만들기
const payment = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_LIST:
      return state.set('paymentList', action.data);
    default:
      return state;
  }
};
export default payment;
