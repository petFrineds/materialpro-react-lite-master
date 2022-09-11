import DogWalkerList from '../../../components/dogWalker/DogWalkerList';
import { Col, Row } from 'reactstrap';
import DogWalkerRegistModal from '../../../components/dogWalker/DogWalkerRegistModal';
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { getAllData } from '../../../api/DogWalkerApi';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDogWalkerList,
  SET_DOGWALKER_LIST_SAGA,
} from '../../../store/DogWalker';

import { CheckCircleOutlined } from '@ant-design/icons';
import { getUserImg } from '../../../api/AuthApi';

const DogWalker = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const dogWalkerList = useSelector(state =>
    state.dogWalker.get('dogWalkerList')
  );

  useEffect(() => {
    getAllData()
      .then(result => {
        dispatch({ type: SET_DOGWALKER_LIST_SAGA, data: result.data });
        result.data.map(async item => {
          setTimeout(() => console.log('after'), 1000);
          await userImg(item.dogwalkerId, item.id);
          return item;
        });
      })
      .catch(error => {
        console.log('getAllData Error >> ' + error);
        dispatch(setDogWalkerList([]));
      });
  }, []);
  const clicked = () => {
    setVisible(true);
  };
  async function userImg(dogwalkerId, id) {
    let imgUrl = '';
    await getUserImg(dogwalkerId)
      .then(result => {
        console.log(result);
        imgUrl = result.data.userimage;
        if (imgUrl === null || imgUrl === '') return;
        const newRow = dogWalkerList.map(item =>
          item.id === id ? { ...item, userImage: imgUrl } : item
        );
        dispatch({ type: SET_DOGWALKER_LIST_SAGA, data: newRow });
      })
      .catch(error => {
        imgUrl = '';
      });
  }
  return (
    <>
      <Row>
        <div className="registbtndiv">
          <Button onClick={clicked} className="registerBtn">
            <CheckCircleOutlined
              style={{
                verticalAlign: 'middle',
              }}
            />
            도그워커 등록
          </Button>
        </div>
        {visible && (
          <DogWalkerRegistModal setVisible={setVisible} visible={visible} />
        )}
      </Row>
      <Row>
        <Col lg="12">{dogWalkerList && <DogWalkerList />}</Col>
      </Row>
    </>
  );
};

export default DogWalker;
