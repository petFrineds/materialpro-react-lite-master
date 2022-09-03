import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  getReservationDetail,
  cancelReservation,
} from '../../../../api/ReservationApi';
import { getUserInfo } from '../../../../api/AuthApi';
import ReservationDetailComponent from '../../../../components/reservation/ReservationDetailComponent';
const ReservationDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reservationinfo, setReservationinfo] = useState();
  const reservationDetailId = useSelector(state =>
    state.reservation.get('reservationDetailId')
  );
  const [dogWalkerInfo, setDogWalkerInfo] = useState({});
  useEffect(() => {
    if (reservationDetailId === undefined || reservationDetailId === '') {
      navigate('/reservation');
      return;
    }
    getReservationDetail(reservationDetailId)
      .then(result => {
        setReservationinfo(result.data);
        getUserInfo(result.data.dogwalkerId)
          .then(result2 => {
            setDogWalkerInfo(result2.data);
          })
          .catch(error2 => {
            console.log('ReservationDetail getUserInfo Error >> ' + error2);
          });
      })
      .catch(error => {
        console.log('ReservationDetail getReservationDetail Error >> ' + error);
      });
  }, []);
  const onClickCancelBtn = () => {
    const param = {
      reservedId: reservationinfo.reservedId,
      status: 'CANCEL',
    };
    cancelReservation(param)
      .then(result => {
        console.log(result);
        navigate('/reservation');
      })
      .catch(error => {
        console.log('ReservationDetail cancelReservation Error >> ' + error);
      });
  };
  return (
    <Col lg="12">
      {reservationinfo && (
        <ReservationDetailComponent
          reservationinfo={reservationinfo}
          dogWalkerInfo={dogWalkerInfo}
          onClickCancelBtn={onClickCancelBtn}
        />
      )}
    </Col>
  );
};

export default ReservationDetail;
