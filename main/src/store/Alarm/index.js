import { fromJS } from 'immutable';

//Action 정의
const SET_MYALARM_COUNT = 'ALARM/SET_MYALARM_COUNT';
const SET_MYALARM_LIST = 'ALARM/SET_MYALARM_LIST';

//초기 상태 정의
const initialState = fromJS({
  alarmCount: undefined,
  myAlarmList: undefined,
});

//Action 생성 함수 정의
export const setMyAlarmCount = alarmCount => ({
  type: SET_MYALARM_COUNT,
  data: alarmCount,
});
export const setMyAlarmList = myAlarmList => ({
  type: SET_MYALARM_LIST,
  data: myAlarmList,
});

//리듀서 함수 만들기
const alarm = (state = initialState, action) => {
  switch (action.type) {
    case SET_MYALARM_COUNT:
      return state.set('alarmCount', action.data);
    case SET_MYALARM_LIST:
      return state.set('myAlarmList', action.data);
    default:
      return state;
  }
};
export default alarm;
