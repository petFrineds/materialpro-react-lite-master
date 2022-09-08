import React, { useState, useEffect } from 'react';
import { Button, Col, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  getReservationDetail,
  deleteReservation,
} from '../../../../api/ReservationApi';
import { getUserInfo } from '../../../../api/AuthApi';
import ReservationDetailComponent from '../../../../components/reservation/ReservationDetailComponent';
import { setReservationInfo } from '../../../../store/Reservation';
import moment from 'moment';
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
  const onClickCancelBtn = startTime => {
    const today = moment().format('YYYY-MM-DD');
    if (moment(startTime).format('YYYY-MM-DD') === today) {
      notification.error({
        message: '예약 취소 실패',
        description: '당일 취소는 불가능합니다.',
        duration: 1.0,
      });
      return;
    }
    const param = {
      reservedId: reservationInfo.reservedId,
      status: 'CANCEL',
    };
    deleteReservation(param)
      .then(result => {
        notification.success({
          message: '예약 취소 완료',
          description: '예약 취소가 성공적으로 되었습니다.',
          duration: 1.0,
        });
        navigate('/reservation');
      })
      .catch(error => {
        notification.error({
          message: '예약 취소 실패',
          description: '예약 취소가 실패되었습니다.',
          duration: 1.0,
        });
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
