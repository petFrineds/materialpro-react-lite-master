import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import { Button, Input, notification } from 'antd';
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
import { saveDaily } from '../../api/DailyApi';
import { setMyDogwalkerList } from '../../store/Mypage';
import SaveButton from '../common/SaveButton';
const { TextArea } = Input;

const DailyWriteComponent = ({ setVisible }) => {
  const dispatch = useDispatch();
  const [contents, setContents] = useState('');
  const dogWalkerInfo = useSelector(state =>
    state.dogWalker.get('dogwalkerInfo')
  );
  const reservationInfo = useSelector(state =>
    state.reservation.get('reservationInfo')
  );
  const walkInfo = useSelector(state => state.walk.get('walkInfo'));
  const myDogwalkerList = useSelector(state =>
    state.mypage.get('myDogwalkerList')
  );

  const onClickSaveBtn = () => {
    if (contents === null || contents === '') {
      notification.warning({
        message: '저장 실패',
        description: '일지를 입력해주세요.',
        duration: 1.0,
      });
      return;
    }
    console.log(walkInfo);
    console.log(reservationInfo);
    console.log(dogWalkerInfo);
    const param = {
      contents: contents,
      walkId: walkInfo.id,
      userId: reservationInfo.userId,
      userName: reservationInfo.userName,
      walkStartDate: walkInfo.walkStartDate,
      walkEndDate: walkInfo.walkEndDate,
      dogWalkerId: dogWalkerInfo.userId,
      dogWalkerName: dogWalkerInfo.userNm,
    };
    saveDaily(param)
      .then(result => {
        notification.success({
          message: '저장 완료',
          description: '일지가 저장 되었습니다.',
          duration: 1.0,
        });
        const newRow = myDogwalkerList.map(item2 =>
          item2.reservedId === reservationInfo.reservedId
            ? { ...item2, status: 'DAILY_WRITED' }
            : item2
        );
        dispatch(setMyDogwalkerList(newRow));
        console.log(result);
      })
      .catch(result => {
        notification.error({
          message: '저장 실패',
          description: '일지가 저장이 실패 되었습니다. >>> ' + result,
          duration: 1.0,
        });
        console.log(result);
      });
    setVisible(false);
  };
  const onChangeContents = e => {
    setContents(e.target.value);
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">산책 일지 작성</CardTitle>
          {dogWalkerInfo && (
            <DogWalkerInfoComponent dogWalkerInfo={dogWalkerInfo} />
          )}
          {reservationInfo && (
            <ReservationInfoComponent reservationInfo={reservationInfo} />
          )}
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
                <td>
                  <TextArea
                    rows={4}
                    value={contents}
                    onChange={onChangeContents}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <SaveButton onClick={onClickSaveBtn} />
        </CardBody>
      </Card>
    </div>
  );
};

export default DailyWriteComponent;
