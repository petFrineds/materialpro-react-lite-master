import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Col, Row } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { setDailyList, setMyDailyList } from '../../../store/Daily';
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
          result.data.map(async item => {
            setTimeout(() => {}, 1000);
            await userImgDogWalkerDaily(item.userId, item.id);
            return item;
          });
        })
        .catch(error => {
          console.log('getUserDailys Error >> ' + error);
        });
      getDogwalkerDailys(userInfo.userId)
        .then(result => {
          dispatch(setMyDailyList(result.data));
          result.data.map(async item => {
            setTimeout(() => {}, 1000);
            await userImgMyDaily(item.userId, item.id);
            return item;
          });
        })
        .catch(error => {
          console.log('getDogwalkerDailys Error >> ' + error);
        });
    }
  }, []);
  async function userImgMyDaily(userId, id) {
    let imgUrl = '';
    await getUserImg(userId)
      .then(result => {
        console.log(result);
        imgUrl = result.data.userimage;
        const newRow = myDailyList.map(item =>
          item.id === id ? { ...item, userImage: imgUrl } : item
        );
        dispatch(setMyDailyList(newRow));
      })
      .catch(error => {
        imgUrl = '';
      });
  }
  async function userImgDogWalkerDaily(dogWalkerId, id) {
    let imgUrl = '';
    await getUserImg(dogWalkerId)
      .then(result => {
        console.log(result);
        imgUrl = result.data.userimage;
        const newRow = dailyList.map(item =>
          item.id === id ? { ...item, userImage: imgUrl } : item
        );
        dispatch(setDailyList(newRow));
      })
      .catch(error => {
        imgUrl = '';
      });
  }
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
