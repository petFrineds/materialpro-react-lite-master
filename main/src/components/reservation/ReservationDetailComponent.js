import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import { Button } from 'antd';
import user1 from '../../assets/images/users/user1.jpg';
import { cancelReservation } from '../../api/ReservationApi';
import { useSelector, useDispatch } from 'react-redux';
import {
  setReservationList,
  setReservationDetailId,
} from '../../store/Reservation';
import { Link, useNavigate } from 'react-router-dom';

const ReservationDetailComponent = ({ reservationDetail }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">예약 상세 조회</CardTitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>이름</th>
                <th>경력</th>
                <th>평점</th>
              </tr>
            </thead>
            <tbody>
              <tr key={reservationDetail.reservedId} className="border-top">
                <td>
                  <div className="d-flex align-items-center p-2">
                    <img
                      src={reservationDetail.avatar ?? user1}
                      className="rounded-circle"
                      alt="avatar"
                      width="45"
                      height="45"
                    />
                    <div className="ms-3">
                      <h6 className="mb-0">{reservationDetail.dogwalkerId}</h6>
                      <span className="text-muted">
                        {reservationDetail.dogwalkerName}
                      </span>
                    </div>
                  </div>
                </td>
                <td>경력 데이터 없음</td>
                <td>평점 데이터 없음</td>
              </tr>
            </tbody>
          </Table>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>날짜</th>
                <th>시작시간</th>
                <th>마침시간</th>
                <th>최종금액</th>
              </tr>
            </thead>
            <tbody>
              <tr key={reservationDetail.reservedId} className="border-top">
                <td>{reservationDetail.startTime.substring(0, 11)}</td>
                <td>{reservationDetail.startTime.substring(11, 18)}</td>
                <td>{reservationDetail.endTime.substring(11, 18)}</td>
                <td>{reservationDetail.amount}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReservationDetailComponent;
