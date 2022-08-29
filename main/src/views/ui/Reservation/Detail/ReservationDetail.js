import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { getReservationDetail } from '../../../../api/ReservationApi';
import ReservationDetailComponent from '../../../../components/reservation/ReservationDetailComponent';
const ReservationDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reservationDetail, setReservationDetail] = useState();
  const reservationDetailId = useSelector(state =>
    state.reservation.get('reservationDetailId')
  );
  useEffect(() => {
    if (reservationDetailId === undefined || reservationDetailId === '') {
      navigate('/reservation');
      return;
    }
    getReservationDetail(reservationDetailId)
      .then(result => {
        setReservationDetail(result.data);
      })
      .catch(error => {
        console.log('getReservationDetail Error >> ' + error);
      });
  }, []);

  return (
    <Col lg="12">
      {reservationDetail && (
        <ReservationDetailComponent reservationDetail={reservationDetail} />
      )}
    </Col>
  );
};

export default ReservationDetail;
