import { Button, Modal, Form, DatePicker, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { registData } from '../../api/DogWalkerApi';
import { useSelector, useDispatch } from 'react-redux';
import { setDogWalkerList } from '../../store/DogWalker';
import { createReservation } from '../../api/ReservationApi';
import moment, { min } from 'moment';

const { RangePicker } = DatePicker;

const ReservationModal = ({
  setVisible,
  visible,
  dogwalkerScheduleInfo,
  userInfo,
}) => {
  const [loading, setLoading] = useState(false);
  const [reservationForm] = Form.useForm();
  const dispatch = useDispatch();
  const dogWalkerList = useSelector(state =>
    state.dogWalker.get('dogWalkerList')
  );
  const [dates, setDates] = useState(null);
  const [dateValue, setDateValue] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const dateFormat = 'YYYY-MM-DD HH:mm';

  useEffect(() => {
    console.log('HH');
    console.log(dogwalkerScheduleInfo);
  }, []);
  useEffect(() => {
    let minDiff = null;
    console.log(dogwalkerScheduleInfo);
    if (dates !== undefined && dates !== null) {
      minDiff = moment.duration(dates[1].diff(dates[0])).asMinutes();
      console.log(minDiff);
    } else {
      minDiff = moment
        .duration(
          moment(dogwalkerScheduleInfo.reservedEndTime, dateFormat).diff(
            moment(dogwalkerScheduleInfo.reservedStartTime, dateFormat)
          )
        )
        .asMinutes();
    }
    setFinalPrice((minDiff / 60) * dogwalkerScheduleInfo.amount);
  }, [dates, dogwalkerScheduleInfo]);

  const handleCancel = () => {
    setVisible(false);
    Modal.destroyAll();
  };

  const handleOk = () => {
    const param = {
      startTime:
        dates !== null && dates !== undefined
          ? moment(dates[0], dateFormat).format(dateFormat)
          : moment(dogwalkerScheduleInfo.reservedStartTime, dateFormat).format(
              dateFormat
            ),
      endTime:
        dates !== null && dates !== undefined
          ? moment(dates[1], dateFormat).format(dateFormat)
          : moment(dogwalkerScheduleInfo.reservedEndTime, dateFormat).format(
              dateFormat
            ),
      amount: finalPrice,
      dogwalkerScheduleId: dogwalkerScheduleInfo.id,
      userId: userInfo.userId,
      userName: userInfo.userNm,
      dogwalkerId: dogwalkerScheduleInfo.dogwalkerId,
      dogwalkerName: dogwalkerScheduleInfo.dogwalkerName,
    };
    console.log(param);
    createReservation(param)
      .then(result => {
        console.log(result);
        notification.success({
          message: '예약 성공',
          description: '예약 되었습니다.',
          duration: 1.0,
        });
      })
      .catch(error => {
        console.log('createReservation Error >> ' + error);
        notification.error({
          message: '예약 실패',
          description: '예약을 실패했습니다.',
          duration: 1.0,
        });
      })
      .finally(function () {
        setVisible(!visible);
      });
  };
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }

    return result;
  }; // eslint-disable-next-line arrow-body-style

  const disabledDate = current => {
    if (current < moment(dogwalkerScheduleInfo.reservedStartTime, dateFormat)) {
      return true;
    } else if (
      current > moment(dogwalkerScheduleInfo.reservedEndTime, dateFormat)
    ) {
      return true;
    } else return false;
  };
  const disabledRangeTime = (_, type) => {
    const startHour = moment(
      dogwalkerScheduleInfo.reservedStartTime,
      dateFormat
    ).hour();
    const endHour = moment(
      dogwalkerScheduleInfo.reservedEndTime,
      dateFormat
    ).hour();
    const startMin = moment(
      dogwalkerScheduleInfo.reservedStartTime,
      dateFormat
    ).minute();
    const endMin = moment(
      dogwalkerScheduleInfo.reservedEndTime,
      dateFormat
    ).minute();

    if (type === 'start') {
      return {
        disabledHours: () => range(0, startHour),
        disabledMinutes: () => range(0, startMin),
      };
    }

    return {
      disabledHours: () => range(endHour, 24),
      disabledMinutes: () => range(endMin, 60),
    };
  };

  const onOk = value => {
    console.log('onOk: ', value);
  };
  return (
    <Modal
      visible={visible}
      title="예약 생성하기"
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
          예약
        </Button>,
      ]}
    >
      <RangePicker
        showTime={{
          format: 'HH:mm',
        }}
        format={dateFormat}
        onCalendarChange={val => setDates(val)}
        defaultValue={[
          moment(dogwalkerScheduleInfo.reservedStartTime, dateFormat),
          moment(dogwalkerScheduleInfo.reservedEndTime, dateFormat),
        ]}
        onOk={onOk}
        minuteStep={30}
        onChange={val => setDateValue(val)}
        disabledDate={disabledDate}
        disabledTime={disabledRangeTime}
      />

      <div>최종 가격 : {finalPrice} ₩</div>
    </Modal>
  );
};

export default ReservationModal;
