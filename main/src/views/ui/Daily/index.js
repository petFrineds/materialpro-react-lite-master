import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setDailyList } from '../../../store/Daily';
import DailyList from '../../../components/daily/DailyList';
import { getUserDailys } from '../../../api/DailyApi';
const Daily = () => {
  const dispatch = useDispatch();
  const dailyList = useSelector(state => state.daily.get('dailyList'));
  const userInfo = useSelector(state => state.user.get('userInfo'));
  useEffect(() => {
    if (userInfo) {
      getUserDailys(userInfo.userId)
        .then(result => {
          dispatch(setDailyList(result.data));
        })
        .catch(error => {
          console.log('getUserDailys Error >> ' + error);
        });
    }
  }, []);
  return <Col lg="12">{dailyList && <DailyList />}</Col>;
};

export default Daily;
