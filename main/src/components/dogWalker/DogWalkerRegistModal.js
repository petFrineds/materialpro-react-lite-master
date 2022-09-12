import { Button, Modal, Form, notification } from 'antd';
import React, { useState } from 'react';
import DogWalkerRegistForm from './DogWalkerRegistForm';
import { registData, getAllData } from '../../api/DogWalkerApi';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDogWalkerList,
  SET_DOGWALKER_LIST_SAGA,
} from '../../store/DogWalker';

const DogWalkerRegistModal = ({ setVisible, visible }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const dogWalkerList = useSelector(state =>
    state.dogWalker.get('dogWalkerList')
  );
  const userInfo = useSelector(state => state.user.get('userInfo'));

  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    setLoading(true);
    if (userInfo === undefined) {
      console.log('유저정보없음');

      return;
    }
    form
      .validateFields()
      .then(values => {
        const starttime = values.walkingtime[0].format('YYYY-MM-DD HH:mm');
        const endtime = values.walkingtime[1].format('YYYY-MM-DD HH:mm');
        const params = {
          dogwalkerName: userInfo.userNm,
          dogwalkerId: userInfo.userId,
          reservedYn: 'N',
          reservedStartTime: starttime,
          reservedEndTime: endtime,
          walkingPlace: values.place,
          career: values.career,
          amount: values.price,
          avgScore: 0.0,
        };
        registData(params)
          .then(result => {
            notification.success({
              message: '등록 완료',
              description: '스케줄이 성공적으로 등록 되었습니다.',
              duration: 1.0,
            });
            getAllData()
              .then(result2 => {
                dispatch(setDogWalkerList(result2.data));
                result2.data.map(item => {
                  return userImg(item.dogwalkerId, item.id);
                });
              })
              .catch(error => {
                console.log('getAllData Error >> ' + error);
                dispatch(setDogWalkerList([]));
              });
          })
          .catch(result => {
            notification.error({
              message: '등록 실패',
              description: '스케줄 등록을 실패했습니다.',
              duration: 1.0,
            });
          })
          .finally(function () {
            setLoading(false);
            setVisible(false);
          });
      })
      .finally(function () {
        setLoading(false);
      });
  };
  const userImg = (dogwalkerId, id) => {
    dispatch({
      type: SET_DOGWALKER_LIST_SAGA,
      data: { id: id, userId: dogwalkerId },
    });
  };
  return (
    <Modal
      visible={visible}
      title="도그워커 등록"
      onOk={handleOk}
      centered
      style={{ top: 20 }}
      onCancel={handleCancel}
      footer={[
        <Button key="cancle" onClick={handleCancel}>
          취소
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={handleOk}
        >
          등록
        </Button>,
      ]}
    >
      <DogWalkerRegistForm form={form} />
    </Modal>
  );
};

export default DogWalkerRegistModal;
