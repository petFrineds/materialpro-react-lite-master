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
import ExitButton from '../common/ExitButton';
const { TextArea } = Input;

const DailyDetailComponent = ({ setVisible, dailyInfo, dailyInfoInit }) => {
  const dispatch = useDispatch();

  const closeDetail = () => {
    dispatch(setDogwalkerInfo(undefined));
    dailyInfoInit();
    setVisible(false);
  };
  const dogWalkerInfo = useSelector(state =>
    state.dogWalker.get('dogwalkerInfo')
  );

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">산책 일지</CardTitle>
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
          <ExitButton onClick={closeDetail} />
        </CardBody>
      </Card>
    </div>
  );
};

export default DailyDetailComponent;
