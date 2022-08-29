import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ReservationList from '../../../components/reservation/ReservationList';
import { getAllMyReservation } from '../../../api/ReservationApi';
import { setReservationList } from '../../../store/Reservation';
const Reservation = () => {
  const dispatch = useDispatch();

  const reservationList = useSelector(state =>
    state.reservation.get('reservationList')
  );
  useEffect(() => {
    getAllMyReservation(sessionStorage.getItem('userId'))
      .then(result => {
        dispatch(setReservationList(result.data));
      })
      .catch(error => {
        console.log('getAllMyReservation Error >> ' + error);
      });
  }, []);
  return (
    <Col lg="12">
      <ReservationList reservationList={reservationList} />
    </Col>
  );
};

export default Reservation;
