import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Col, Row } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { setDailyList, setMyDailyList } from '../../../store/Daily';
import DailyList from '../../../components/daily/DailyList';
import MyDailyList from '../../../components/daily/MyDailyList';
import { getUserDailys, getDogwalkerDailys } from '../../../api/DailyApi';
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
        })
        .catch(error => {
          console.log('getUserDailys Error >> ' + error);
        });
      getDogwalkerDailys(userInfo.userId)
        .then(result => {
          dispatch(setMyDailyList(result.data));
        })
        .catch(error => {
          console.log('getDogwalkerDailys Error >> ' + error);
        });
    }
  }, []);
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
