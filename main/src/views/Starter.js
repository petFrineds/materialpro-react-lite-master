import { Col, Row } from 'reactstrap';

import MyDogwalkerList from '../components/myPage/MyDogwalkerList';
import MyReserveList from '../components/myPage/MyReserveList';
import bg1 from '../assets/images/bg/bg1.jpg';
import bg2 from '../assets/images/bg/bg2.jpg';
import bg3 from '../assets/images/bg/bg3.jpg';
import bg4 from '../assets/images/bg/bg4.jpg';
import { getMyReserveList, getMyDogwalkerList } from '../api/MypageApi';
import { setMyDogwalkerList, setMyReserveList } from '../store/Mypage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyWalk } from '../api/WalkApi';
import { setMyWalkList } from '../store/Walk';
import StarRank from '../components/dashboard/StarRank';
import WalkRank from '../components/dashboard/WalkRank';

const Starter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem('userId') !== null) {
      const userId = sessionStorage.getItem('userId');
      getMyDogwalkerList(userId)
        .then(result => {
          dispatch(setMyDogwalkerList(result.data));
        })
        .catch(error => {
          console.log('getUserInfo Error');
        });
      getMyReserveList(userId)
        .then(result => {
          dispatch(setMyReserveList(result.data));
        })
        .catch(error => {
          console.log('getMyReserveList Error');
        });
      getMyWalk(userId)
        .then(result => {
          dispatch(setMyWalkList(result.data));
        })
        .catch(error => {
          console.log('getMyWalk Error');
        });
    }
  }, [sessionStorage.getItem('userId')]);
  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="6" xxl="6">
          <StarRank />
        </Col>
        <Col sm="6" lg="6" xl="6" xxl="6">
          <WalkRank />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <MyDogwalkerList />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <MyReserveList />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
