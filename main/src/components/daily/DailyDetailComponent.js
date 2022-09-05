import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import { Button, Input, Rate, notification } from 'antd';
import user1 from '../../assets/images/users/user1.jpg';
import { cancelReservation } from '../../api/ReservationApi';
import { useSelector, useDispatch } from 'react-redux';
import {
  setReservationList,
  setReservationDetailId,
} from '../../store/Reservation';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/AuthApi';
import DogWalkerInfoComponent from '../dogWalker/DogWalkerInfoComponent';
import ReservationInfoComponent from '../reservation/ReservationInfoComponent';
import { saveScore } from '../../api/DailyApi';
import { setDogwalkerInfo } from '../../store/DogWalker';
import { setDailyInfo } from '../../store/Daily';
const { TextArea } = Input;

const DailyDetailComponent = ({ setVisible }) => {
  const dispatch = useDispatch();

  const closeDetail = () => {
    dispatch(setDogwalkerInfo(undefined));
    dispatch(setDailyInfo(undefined));
    setVisible(false);
  };
  const dogWalkerInfo = useSelector(state =>
    state.dogWalker.get('dogwalkerInfo')
  );
  const dailyInfo = useSelector(state => state.daily.get('dailyInfo'));

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">산책 일지 작성</CardTitle>
          {dogWalkerInfo && (
            <DogWalkerInfoComponent dogWalkerInfo={dogWalkerInfo} />
          )}
          <Table
            hover
            className="no-wrap mt-3 align-middle"
            responsive
            borderless
          >
            <thead>
              <tr>
                <th>산책 시간</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-top">
                <td>
                  {dailyInfo.walkStartDate} ~ {dailyInfo.walkEndDate}
                </td>
              </tr>
            </tbody>
          </Table>
          <Table
            hover
            className="no-wrap mt-3 align-middle"
            responsive
            borderless
          >
            <thead>
              <tr>
                <th>산책 내용</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-top">
                <td>{dailyInfo.contents}</td>
              </tr>
            </tbody>
          </Table>
          <Table
            hover
            className="no-wrap mt-3 align-middle"
            responsive
            borderless
          >
            <thead>
              <tr>
                <th>별점</th>
                <th>후기 내용</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-top">
                <td>
                  <Rate disabled defaultValue={dailyInfo.starScore} />
                </td>
                <td>
                  <TextArea disabled rows={4} value={dailyInfo.review} />
                </td>
              </tr>
            </tbody>
          </Table>
          <Button onClick={closeDetail}>닫기</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default DailyDetailComponent;
