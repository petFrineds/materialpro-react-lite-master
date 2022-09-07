import DogWalkerList from '../../../components/dogWalker/DogWalkerList';
import { Col, Row } from 'reactstrap';
import DogWalkerRegistModal from '../../../components/dogWalker/DogWalkerRegistModal';
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { getAllData } from '../../../api/DogWalkerApi';
import { useSelector, useDispatch } from 'react-redux';
import { setDogWalkerList } from '../../../store/DogWalker';
import { CheckCircleOutlined } from '@ant-design/icons';

const DogWalker = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const dogWalkerList = useSelector(state =>
    state.dogWalker.get('dogWalkerList')
  );
  useEffect(() => {
    getAllData()
      .then(result => {
        dispatch(setDogWalkerList(result.data));
      })
      .catch(error => {
        console.log('getAllData Error >> ' + error);
        dispatch(setDogWalkerList([]));
      });
  }, []);
  const clicked = () => {
    setVisible(true);
  };

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
        <Col lg="12">
          {dogWalkerList && <DogWalkerList dogWalkerList={dogWalkerList} />}
        </Col>
      </Row>
    </>
  );
};

export default DogWalker;
