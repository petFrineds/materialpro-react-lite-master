import { Button } from 'antd';
import { useEffect } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

import user1 from '../../assets/images/users/user1.jpg';
import { setReservationDetailId } from '../../store/Reservation';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation } from '../../api/ReservationApi';
const DogWalkerList = ({ dogWalkerList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.user.get('userInfo'));
  const onClickReserveBtn = dogwalkerschedule => {
    console.log(userInfo);
    console.log(dogwalkerschedule);
    const param = {
      dogwalkerScheduleId: dogwalkerschedule.id,
      userId: userInfo.userId,
      status: dogwalkerschedule.reservedYn,
    };
    createReservation(param)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log('DogWalkerList DogWalkerList Error >> ' + error);
      });
    // navigate('/reservationDetail');
  };
  return (
    <div>
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
              {dogWalkerList?.map((item, index) => (
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
                        <h6 className="mb-0">{item.dogwalkerId}</h6>
                        <span className="text-muted">{item.dogwalkerName}</span>
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
                    {item.reservedYn !== 'Y' && (
                      <Button onClick={() => onClickReserveBtn(item)}>
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
    </div>
  );
};

export default DogWalkerList;
