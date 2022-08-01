import { Button, Modal, Form } from 'antd';
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
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    setLoading(true);
    form.validateFields().then(values => {
      const starttime = values.walkingtime[0].format('YYYY-MM-DD HH:mm');
      const endtime = values.walkingtime[1].format('YYYY-MM-DD HH:mm');
      const params = {
        userName: 'jjeun',
        userId: 1,
        reservedYn: 'N',
        reservedStartTime: values.walkingtime[0],
        reservedEndTime: values.walkingtime[1],
        walkingPlace: values.place,
        career: values.career,
        price: values.price,
        avgScore: 0.0,
      };
      registData(params)
        .then(result => {
          setVisible(false);
        })
        .catch(result => {
          console.log(result);
        })
        .finally(function () {
          setLoading(false);
        });
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
