import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  getReservationDetail,
  deleteReservation,
} from '../../../../api/ReservationApi';
import { getUserInfo } from '../../../../api/AuthApi';
import ReservationDetailComponent from '../../../../components/reservation/ReservationDetailComponent';
import { setReservationInfo } from '../../../../store/Reservation';
const ReservationDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reservationDetailId = useSelector(state =>
    state.reservation.get('reservationDetailId')
  );
  const reservationInfo = useSelector(state =>
    state.reservation.get('reservationInfo')
  );
  const [dogWalkerInfo, setDogWalkerInfo] = useState({});
  useEffect(() => {
    if (reservationDetailId === undefined || reservationDetailId === '') {
      navigate('/reservation');
      return;
    }
    getReservationDetail(reservationDetailId)
      .then(result => {
        dispatch(setReservationInfo(result.data));
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
      reservedId: reservationInfo.reservedId,
      status: 'CANCEL',
    };
    deleteReservation(param)
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
      {reservationInfo && (
        <ReservationDetailComponent
          dogWalkerInfo={dogWalkerInfo}
          onClickCancelBtn={onClickCancelBtn}
        />
      )}
    </Col>
  );
};

export default ReservationDetail;
