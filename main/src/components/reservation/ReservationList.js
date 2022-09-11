import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import { Button, notification } from 'antd';
import user1 from '../../assets/images/users/user1.jpg';
import { cancelReservation } from '../../api/ReservationApi';
import { useSelector, useDispatch } from 'react-redux';
import {
  setReservationList,
  setReservationDetailId,
} from '../../store/Reservation';
import { useNavigate } from 'react-router-dom';
import { startWalk } from '../../api/WalkApi';

const ReservationList = ({ reservationList, userInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showReserVationDetail = reservedId => {
    dispatch(setReservationDetailId(reservedId));
    navigate('/reservationDetail');
  };

  const onClickCancelBtn = (e, reservedId) => {
    e.stopPropagation();
    const param = {
      reservedId: reservedId,
      status: 'CANCEL',
    };
    cancelReservation(param)
      .then(result => {
        const newRow = reservationList.map(item =>
          item.reservedId === reservedId ? { ...item, status: 'CANCEL' } : item
        );
        dispatch(setReservationList(newRow));
      })
      .catch(error => {
        console.log('cancelReservation Error >> ' + error);
      });
  };
  const onClickStartWalk = item => {
    const param = {
      reservedId: item.reservedId,
      userId: userInfo.userId,
      dogWalkerId: item.dogwalkerId,
    };
    startWalk(param)
      .then(result => {
        notification.success({
          message: '산책 시작',
          description: '산책이 성공적으로 시작 되었습니다.',
          duration: 1.0,
        });
      })
      .catch(error => {
        console.log('startWalk Error >> ' + error);
      });
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">예약 전체 조회</CardTitle>

          <Table
            hover
            className="no-wrap mt-3 align-middle"
            responsive
            borderless
          >
            <thead>
              <tr>
                <th>이름</th>
                <th>스케줄</th>
                <th>금액</th>
                <th>상태</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {reservationList?.map((item, index) => (
                <tr
                  key={index}
                  className="border-top"
                  style={{}}
                  onClick={() => showReserVationDetail(item.reservedId)}
                >
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={
                          item?.userImage
                            ? `data:image/jpeg;base64,${item.userImage}`
                            : user1
                        }
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{item.dogwalkerId}</h6>
                        <span className="text-muted">{item.dogwalkerName}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.startTime} ~ {item.endTime}
                  </td>
                  <td>
                    {item.amount && item.amount.toLocaleString('ko-KR', 3)}
                  </td>
                  <td>{item.status}</td>
                  {item.status === 'PAYED' &&
                  item.dogwalkerId === userInfo.userId ? (
                    <td>
                      <Button onClick={() => onClickStartWalk(item)}>
                        산책시작
                      </Button>
                    </td>
                  ) : item.status === 'END' &&
                    item.dogwalkerId === userInfo.userId ? (
                    <td>
                      <Button>일지작성</Button>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReservationList;
