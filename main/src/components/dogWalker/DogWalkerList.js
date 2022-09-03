import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

import user1 from '../../assets/images/users/user1.jpg';
import { setReservationDetailId } from '../../store/Reservation';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReservationModal from '../reservation/ReservationModal';
import DogWalkerInfoComponent from './DogWalkerInfoComponent';
import { getUserInfo } from '../../api/AuthApi';
const DogWalkerList = ({ dogWalkerList }) => {
  const [reservationVisible, setReservationVisible] = useState(false);
  const [dogwalkerScheduleInfo, setDogwalkerScheduleInfo] = useState({});
  const [dogwalkerDetail, setDogwalkerDetail] = useState(false);
  const [dogWalkerInfo, setDogWalkerInfo] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.user.get('userInfo'));
  const dogWalkerList2 = useSelector(state =>
    state.dogWalker.get('dogWalkerList')
  );
  const onClickReserveBtn = (e, dogwalkerschedule) => {
    e.stopPropagation();

    setDogwalkerScheduleInfo(dogwalkerschedule);
    console.log(dogwalkerschedule);
    setReservationVisible(true);
  };

  const onClickDetail = dogwalkerId => {
    getUserInfo(dogwalkerId)
      .then(result => {
        console.log(result.data);
        setDogWalkerInfo(result.data);
        setDogwalkerDetail(true);
      })
      .catch(error => {
        console.log('ReservationDetail getUserInfo Error >> ' + error);
        setDogwalkerDetail(false);
      });
  };
  return (
    <div>
      {!dogwalkerDetail && (
        <Card>
          <CardBody>
            <CardTitle tag="h5">도그 워커 조회</CardTitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>도그워커</th>
                  <th>평점</th>
                  <th>Status</th>
                  <th>경력(년)</th>
                  <th>가격(₩)</th>
                  <th>산책 가능 시간</th>
                  <th>산책 지역</th>
                  <th>등록일</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {dogWalkerList2?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-top"
                    onClick={() => onClickDetail(item.dogwalkerId)}
                  >
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
                          <h6 className="mb-0">{item.dogwalkerId}</h6>
                          <span className="text-muted">
                            {item.dogwalkerName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{item.avgScore}</td>
                    <td>
                      {item.reservedYn === 'Y' ? (
                        <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                      ) : (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                      )}
                    </td>
                    <td>{item.career}</td>
                    <td>{item.amount}</td>
                    <td>
                      {item.reservedStartTime} ~ {item.reservedEndTime}
                    </td>
                    <td>{item.walkingPlace}</td>
                    <td>{item.regDate.substring(0, 10)}</td>
                    <td>
                      {item.reservedYn !== 'Y' &&
                        item.dogwalkerId !== userInfo.userId && (
                          <Button onClick={e => onClickReserveBtn(e, item)}>
                            예약하기
                          </Button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      )}

      {dogwalkerDetail && dogWalkerInfo !== null && (
        <Card>
          <CardBody>
            <CardTitle tag="h5">도그 워커 상세조회</CardTitle>
            <DogWalkerInfoComponent
              dogWalkerInfo={dogWalkerInfo}
              setDogwalkerDetail={setDogwalkerDetail}
              dogwalkerDetail={dogwalkerDetail}
            />
          </CardBody>
        </Card>
      )}
      <ReservationModal
        setVisible={setReservationVisible}
        visible={reservationVisible}
        dogwalkerScheduleInfo={dogwalkerScheduleInfo}
        userInfo={userInfo}
      />
    </div>
  );
};

export default DogWalkerList;
