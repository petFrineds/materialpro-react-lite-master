import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import { Button, TextArea } from 'antd';
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
const DailyWriteComponent = ({ reservationinfo, dogWalkerInfo }) => {
  const saveDaily = () => {};
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">산책 일지 작성</CardTitle>
          <DogWalkerInfoComponent dogWalkerInfo={dogWalkerInfo} />
          <ReservationInfoComponent reservationinfo={reservationinfo} />
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>산책 내용</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-top">
                <td>
                  <TextArea rows={4} />
                </td>
              </tr>
            </tbody>
          </Table>
          <Button onClick={saveDaily}>저장</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default DailyWriteComponent;
