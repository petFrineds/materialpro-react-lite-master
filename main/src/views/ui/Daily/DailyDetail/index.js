import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { getAllData } from '../../../../api/DogWalkerApi';
import { useSelector, useDispatch } from 'react-redux';
import { setDogWalkerList } from '../../../../store/DogWalker';
import DailyWriteComponent from '../../../../components/daily/DailyWriteComponent';
import DailyStarScoreComponent from '../../../../components/daily/DailyDetailComponent';
const DailyDetail = () => {
  useEffect(() => {}, []);
  return (
    <Col lg="12">
      <DailyWriteComponent />
      <DailyStarScoreComponent />
    </Col>
  );
};

export default DailyDetail;
