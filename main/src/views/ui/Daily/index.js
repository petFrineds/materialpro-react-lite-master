import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Col, Row } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import {
  setDailyList,
  setMyDailyList,
  SET_DAILY_LIST_SAGA,
  SET_MY_DAILY_LIST_SAGA,
} from '../../../store/Daily';
import DailyList from '../../../components/daily/DailyList';
import MyDailyList from '../../../components/daily/MyDailyList';
import { getUserDailys, getDogwalkerDailys } from '../../../api/DailyApi';

import { getUserImg } from '../../../api/AuthApi';
const Daily = () => {
  const dispatch = useDispatch();
  const dailyList = useSelector(state => state.daily.get('dailyList'));
  const userInfo = useSelector(state => state.user.get('userInfo'));
  const myDailyList = useSelector(state => state.daily.get('myDailyList'));
  useEffect(() => {
    if (userInfo) {
      getUserDailys(userInfo.userId)
        .then(result => {
          dispatch(setDailyList(result.data));
          result.data?.map(item => {
            userImgDogWalkerDaily(item.dogWalkerId, item.id);
            return item;
          });
        })
        .catch(error => {
          console.log('getUserDailys Error >> ' + error);
        });
      getDogwalkerDailys(userInfo.userId)
        .then(result => {
          dispatch(setMyDailyList(result.data));
          result.data?.map(item => {
            userImgMyDaily(item.userId, item.id);
            return item;
          });
        })
        .catch(error => {
          console.log('getDogwalkerDailys Error >> ' + error);
        });
    }
  }, []);
  const userImgMyDaily = (userId, id) => {
    dispatch({
      type: SET_MY_DAILY_LIST_SAGA,
      data: { id: id, userId: userId },
    });
  };

  const userImgDogWalkerDaily = (dogWalkerId, id) => {
    dispatch({
      type: SET_DAILY_LIST_SAGA,
      data: { id: id, userId: dogWalkerId },
    });
  };
  return (
    <>
      <Row>
        <Col lg="12">{dailyList && <DailyList />}</Col>
      </Row>
      <Row>
        <Col lg="12">{myDailyList && <MyDailyList />}</Col>
      </Row>
    </>
  );
};

export default Daily;
