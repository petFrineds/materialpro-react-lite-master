import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ReservationList from '../../../components/reservation/ReservationList';
import { getAllMyReservation } from '../../../api/ReservationApi';
import {
  setReservationList,
  SET_RESERVATION_LIST_SAGA,
} from '../../../store/Reservation';
import { getUserImg } from '../../../api/AuthApi';

const Reservation = () => {
  const dispatch = useDispatch();

  const reservationList = useSelector(state =>
    state.reservation.get('reservationList')
  );
  const userInfo = useSelector(state => state.user.get('userInfo'));

  useEffect(() => {
    getAllMyReservation(sessionStorage.getItem('userId'))
      .then(result => {
        dispatch(setReservationList(result.data));
        result.data.map(item => {
          return userImg(item.dogwalkerId, item.reservedId);
        });
      })
      .catch(error => {
        console.log('getAllMyReservation Error >> ' + error);
      });
  }, []);
  const userImg = (dogwalkerId, reservedId) => {
    dispatch({
      type: SET_RESERVATION_LIST_SAGA,
      data: { id: reservedId, userId: dogwalkerId },
    });
  };
  return (
    <Col lg="12">
      {reservationList && (
        <ReservationList
          reservationList={reservationList}
          userInfo={userInfo}
        />
      )}
    </Col>
  );
};

export default Reservation;
