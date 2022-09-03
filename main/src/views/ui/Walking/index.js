import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ReservationList from '../../../components/reservation/ReservationList';
import { getAllMyReservation } from '../../../api/ReservationApi';
import { setReservationList } from '../../../store/Reservation';
const Walking = () => {
  const dispatch = useDispatch();

  const reservationList = useSelector(state =>
    state.reservation.get('reservationList')
  );
  const userInfo = useSelector(state => state.user.get('userInfo'));

  useEffect(() => {
    if (userInfo) {
      getAllMyReservation(userInfo.userId)
        .then(result => {
          dispatch(setReservationList(result.data));
        })
        .catch(error => {
          console.log('getAllMyReservation Error >> ' + error);
        });
    }
  }, []);
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

export default Walking;
