import { Button, Modal, Form, notification } from 'antd';
import React, { useState } from 'react';
import DogWalkerRegistForm from './DogWalkerRegistForm';
import { registData } from '../../api/DogWalkerApi';
import { useSelector, useDispatch } from 'react-redux';
import { setDogWalkerList } from '../../store/DogWalker';

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
    console.log(userInfo);
    if (userInfo === undefined) {
      console.log('유저정보없음');

      return;
    }
    form
      .validateFields()
      .then(values => {
        console.log(values);
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
            console.log(result.data);
            const newRow = [...dogWalkerList, result.data];
            dispatch(setDogWalkerList(newRow));
          })
          .catch(result => {
            console.log(result);
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
