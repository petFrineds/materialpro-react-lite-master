import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ReservationList from '../../../components/reservation/ReservationList';
import { getAllMyReservation } from '../../../api/ReservationApi';
import { setReservationList } from '../../../store/Reservation';
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
        result.data.map(async item => {
          setTimeout(() => {}, 1000);
          await userImg(item.dogwalkerId, item.reservedId);
          return item;
        });
      })
      .catch(error => {
        console.log('getAllMyReservation Error >> ' + error);
      });
  }, []);
  async function userImg(dogwalkerId, reservedId) {
    let imgUrl = '';
    getUserImg(dogwalkerId)
      .then(result => {
        console.log(result);
        imgUrl = result.data.userimage;
        const newRow = reservationList.map(item =>
          item.reservedId === reservedId ? { ...item, userImage: imgUrl } : item
        );
        dispatch(setReservationList(newRow));
      })
      .catch(error => {
        imgUrl = '';
      });
  }
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
