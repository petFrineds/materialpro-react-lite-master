import { Button, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import user1 from '../../assets/images/users/user1.jpg';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { startWalk, endWalk, getWalkDetail } from '../../api/WalkApi';
import { setDailyInfo } from '../../store/Daily';
import { Link, useNavigate } from 'react-router-dom';
import DailyWriteComponent from '../daily/DailyWriteComponent';
import { getReservationDetail } from '../../api/ReservationApi';
import { getUserInfo } from '../../api/AuthApi';
import { setDogwalkerInfo } from '../../store/DogWalker';
import { setReservationInfo } from '../../store/Reservation';
import { setWalkInfo } from '../../store/Walk';
import { getDogwalkscheuleDetail } from '../../api/DogWalkerApi';
import { setMyDogwalkerList } from '../../store/Mypage';
const MyDogwalkerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visibleDaily, setVisibleDaily] = useState(false);
  const myDogwalkerList = useSelector(state =>
    state.mypage.get('myDogwalkerList')
  );
  const userInfo = useSelector(state => state.user.get('userInfo'));
  const onClickStartWalk = item => {
    const param = {
      reservedId: item.reservedId,
      userId: item.userId,
      dogWalkerId: item.dogwalkerId,
    };

    startWalk(param)
      .then(result => {
        notification.success({
          message: '산책 시작',
          description: '산책이 성공적으로 시작 되었습니다.',
          duration: 1.0,
        });
        const newRow = myDogwalkerList.map(item2 =>
          item2.reservedId === item.reservedId
            ? { ...item2, status: 'START' }
            : item2
        );
        dispatch(setMyDogwalkerList(newRow));
      })
      .catch(error => {
        notification.error({
          message: '산책 실패',
          description: '산책 시작이 실패 되었습니다.',
          duration: 1.0,
        });
        console.log('startWalk Error >> ' + error);
      });
  };
  const onClickEndWalk = item => {
    const param = {
      reservedId: item.reservedId,
      userId: item.userId,
      dogWalkerId: item.dogwalkerId,
    };

    endWalk(param)
      .then(result => {
        notification.success({
          message: '산책 종료',
          description: '산책이 성공적으로 종료 되었습니다.',
          duration: 1.0,
        });
        const newRow = myDogwalkerList.map(item2 =>
          item2.reservedId === item.reservedId
            ? { ...item2, status: 'END' }
            : item2
        );
        dispatch(setMyDogwalkerList(newRow));
      })
      .catch(error => {
        notification.error({
          message: '산책 종료',
          description: '산책 종료가 실패 되었습니다.',
          duration: 1.0,
        });
        console.log('startWalk Error >> ' + error);
      });
  };
  const onClickWriteDaily = item => {
    getReservationDetail(item.reservedId)
      .then(result => {
        dispatch(setReservationInfo(result.data));
      })
      .catch(error => {
        console.log('getReservationDetail Error >> ' + error);
      });
    getUserInfo(item.dogwalkerId)
      .then(result => {
        dispatch(setDogwalkerInfo(result.data));
      })
      .catch(error => {
        console.log('getDogwalkscheuleDetail Error >> ' + error);
      });
    getWalkDetail(item.reservedId)
      .then(result => {
        dispatch(setWalkInfo(result.data));
      })
      .catch(error => {
        console.log('getWalkDetail Error >> ' + error);
      });
    getDogwalkscheuleDetail(item.dogwalkerScheduleId)
      .then(result => {})
      .catch(error => {
        console.log('getWalkDetail Error >> ' + error);
      });
    setVisibleDaily(true);
  };
  return (
    <div>
      <Card>
        {!visibleDaily && (
          <CardBody>
            <CardTitle tag="h5">내 스케줄 조회</CardTitle>

            <Table
              hover
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
            >
              <thead>
                <tr>
                  <th>예약한 유저</th>
                  <th>Status</th>
                  <th>가격(₩)</th>
                  <th>산책 요청 시간</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {myDogwalkerList?.map((item, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={item.avatar ?? user1}
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{item.userId}</h6>
                          <span className="text-muted">{item.userName}</span>
                        </div>
                      </div>
                    </td>
                    <td>{item.status}</td>
                    <td>
                      {item.amount && item.amount.toLocaleString('ko-KR', 3)}
                    </td>
                    <td>
                      {moment(item.startTime).format('YYYY-MM-DD HH:mm')} ~
                      {moment(item.endTime).format('YYYY-MM-DD HH:mm')}
                    </td>
                    <td>
                      {item.status === 'PAYED' && (
                        <Button onClick={() => onClickStartWalk(item)}>
                          산책 시작
                        </Button>
                      )}
                      {item.status === 'START' && (
                        <Button onClick={() => onClickEndWalk(item)}>
                          산책 종료
                        </Button>
                      )}
                      {item.status === 'END' && (
                        <Button onClick={() => onClickWriteDaily(item)}>
                          일지 작성
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        )}
        {visibleDaily && <DailyWriteComponent setVisible={setVisibleDaily} />}
      </Card>
    </div>
  );
};

export default MyDogwalkerList;
