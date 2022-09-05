import { Input, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDailyInfo, setDailyList } from '../../store/Daily';
import {
  setDogWalkerList,
  setDogwalkerScheduleInfo,
  setDogwalkerInfo,
} from '../../store/DogWalker';
import { setMyDogwalkerList, setMyReserveList } from '../../store/Mypage';
import { setPaymentList, setPointList } from '../../store/Payment';
import {
  setReservationDetailId,
  setReservationList,
  setReservationInfo,
} from '../../store/Reservation';
import { setWalkInfo } from '../../store/Walk';
import { setUserInfo } from '../../store/User';

export const initReduxAll = dispatch => {
  dispatch(setDailyInfo(undefined));
  dispatch(setDailyList(undefined));
  dispatch(setDogWalkerList(undefined));
  dispatch(setDogwalkerScheduleInfo(undefined));
  dispatch(setDogwalkerInfo(undefined));
  dispatch(setMyDogwalkerList(undefined));
  dispatch(setMyReserveList(undefined));
  dispatch(setPaymentList(undefined));
  dispatch(setPointList(undefined));
  dispatch(setReservationDetailId(undefined));
  dispatch(setReservationList(undefined));
  dispatch(setReservationInfo(undefined));
  dispatch(setWalkInfo(undefined));
  dispatch(setUserInfo(undefined));
};
