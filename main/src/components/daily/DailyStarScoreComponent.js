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
import { setDailyInfo, setDailyList } from '../../store/Daily';
import SaveButton from '../common/SaveButton';
const { TextArea } = Input;

const DailyStarScoreComponent = ({ setVisible }) => {
  const [starScore, setStarScore] = useState(0);
  const [review, setReview] = useState('');
  const dispatch = useDispatch();
  const dailyList = useSelector(state => state.daily.get('dailyList'));

  const saveDaily = () => {
    if (review === '' || review === undefined || review.length < 1) {
      notification.warning({
        message: '후기 작성',
        description: '후기를 작성해주세요.',
        duration: 1.0,
      });
      return;
    }
    const param = {
      id: dailyInfo.id,
      starScore: starScore,
      review: review,
      userId: dailyInfo.userId,
      userName: dailyInfo.userName,
    };
    saveScore(param)
      .then(result => {
        notification.success({
          message: '후기 작성 완료',
          description: '후기가 성공적으로 저장 되었습니다.',
          duration: 1.0,
        });
        const newRow = dailyList.map(item =>
          item.id === dailyInfo.id
            ? { ...item, review: review, starScore: starScore }
            : item
        );
        dispatch(setDailyList(newRow));
      })
      .catch(result => {
        notification.error({
          message: '후기 작성 실패',
          description: '후기 작성이 실패 되었습니다. >>> ' + result,
          duration: 1.0,
        });
      })
      .finally(function () {
        dispatch(setDogwalkerInfo(undefined));
        dispatch(setDailyInfo(undefined));
        setVisible(false);
      });
  };
  const dogWalkerInfo = useSelector(state =>
    state.dogWalker.get('dogwalkerInfo')
  );
  const walkInfo = useSelector(state => state.walk.get('walkInfo'));
  const dailyInfo = useSelector(state => state.daily.get('dailyInfo'));
  const onChangeReview = e => {
    setReview(e.target.value);
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">산책 일지 작성</CardTitle>
          {dogWalkerInfo && (
            <DogWalkerInfoComponent dogWalkerInfo={dogWalkerInfo} />
          )}
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
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
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
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
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>별점</th>
                <th>후기 내용</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-top">
                <td>
                  <Rate onChange={setStarScore} value={starScore} />
                </td>
                <td>
                  <TextArea
                    rows={4}
                    value={review ?? ''}
                    onChange={onChangeReview}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <SaveButton onClick={saveDaily} />
        </CardBody>
      </Card>
    </div>
  );
};

export default DailyStarScoreComponent;
