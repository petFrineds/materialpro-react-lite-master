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
import { useDispatch, useSelector } from 'react-redux';
import { getMyWalk } from '../api/WalkApi';
import { setMyWalkList } from '../store/Walk';
import StarRank from '../components/dashboard/StarRank';
import WalkRank from '../components/dashboard/WalkRank';
import { getUserImg } from '../api/AuthApi';
const Starter = () => {
  const dispatch = useDispatch();
  const myDogwalkerList = useSelector(state =>
    state.mypage.get('myDogwalkerList')
  );
  const myReserveList = useSelector(state => state.mypage.get('myReserveList'));

  useEffect(() => {
    if (sessionStorage.getItem('userId') !== null) {
      const userId = sessionStorage.getItem('userId');
      getMyDogwalkerList(userId)
        .then(result => {
          dispatch(setMyDogwalkerList(result.data));
          result.data.map(async item => {
            setTimeout(() => {}, 1000);
            await userImgDogWalker(item.userId, item.reservedId);
            return item;
          });
        })
        .catch(error => {
          console.log('getUserInfo Error');
        });
      getMyReserveList(userId)
        .then(result => {
          dispatch(setMyReserveList(result.data));
          result.data.map(async item => {
            setTimeout(() => {}, 1000);
            await userImgReservation(item.dogwalkerId, item.reservedId);
            return item;
          });
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
  async function userImgDogWalker(dogwalkerId, id) {
    let imgUrl = '';
    getUserImg(dogwalkerId)
      .then(result => {
        console.log(result);
        imgUrl = result.data.userimage;
        const newRow = myDogwalkerList.map(item =>
          item.reservedId === id ? { ...item, userImage: imgUrl } : item
        );
        dispatch(setMyDogwalkerList(newRow));
      })
      .catch(error => {
        imgUrl = '';
      });
  }
  async function userImgReservation(userId, id) {
    let imgUrl = '';
    getUserImg(userId)
      .then(result => {
        console.log(result);
        imgUrl = result.data.userimage;
        const newRow = myReserveList.map(item =>
          item.reservedId === id ? { ...item, userImage: imgUrl } : item
        );
        dispatch(setMyReserveList(newRow));
      })
      .catch(error => {
        imgUrl = '';
      });
  }
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
