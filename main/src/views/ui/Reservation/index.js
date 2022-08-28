import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ReservationList from '../../../components/reservation/ReservationList';
import { getAllMyReservation } from '../../../api/ReservationApi';
const Reservation = () => {
  const reservationList = useSelector(state =>
    state.dogWalker.get('reservationList')
  );
  useEffect(() => {
    getAllMyReservation(sessionStorage.getItem('userId'))
      .then(result => {
        console.log(result);
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
