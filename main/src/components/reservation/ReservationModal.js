import { Button, Modal, Form, DatePicker, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { registData } from '../../api/DogWalkerApi';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDogWalkerList,
  setDogwalkerScheduleInfo,
} from '../../store/DogWalker';
import { Link, useNavigate } from 'react-router-dom';

import { createReservation } from '../../api/ReservationApi';
import { setReservationDetailId } from '../../store/Reservation';
import moment from 'moment';

const { RangePicker } = DatePicker;

const ReservationModal = ({
  setVisible,
  visible,
  payModalVisible,
  setPayModalVisible,
}) => {
  const [loading, setLoading] = useState(false);
  const [reservationForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dogWalkerList = useSelector(state =>
    state.dogWalker.get('dogWalkerList')
  );
  const [dates, setDates] = useState(null);
  const [dateValue, setDateValue] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const dateFormat = 'YYYY-MM-DD HH:mm';
  const [defaultValue, setDefaultValue] = useState([]);
  const dogwalkerScheduleInfo = useSelector(state =>
    state.dogWalker.get('dogwalkerScheduleInfo')
  );
  const userInfo = useSelector(state => state.user.get('userInfo'));

  useEffect(() => {
    if (visible && dogwalkerScheduleInfo) {
      setDates([
        moment(dogwalkerScheduleInfo.reservedStartTime, dateFormat),
        moment(dogwalkerScheduleInfo.reservedEndTime, dateFormat),
      ]);
      let minDiff = null;
      if (dates !== undefined && dates !== null) {
        minDiff = moment.duration(dates[1].diff(dates[0])).asMinutes();
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
    }
  }, [visible]);
  useEffect(() => {
    let minDiff = null;
    if (!dogwalkerScheduleInfo) return;
    if (dates !== undefined && dates !== null) {
      minDiff = moment.duration(dates[1].diff(dates[0])).asMinutes();
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
    dispatch(setDogwalkerScheduleInfo(undefined));
    setVisible(false);
  };

  const handleOk = () => {
    const startTime =
      dates !== null && dates !== undefined
        ? moment(dates[0], dateFormat).format(dateFormat)
        : moment(dogwalkerScheduleInfo.reservedStartTime, dateFormat).format(
            dateFormat
          );
    const endTime =
      dates !== null && dates !== undefined
        ? moment(dates[1], dateFormat).format(dateFormat)
        : moment(dogwalkerScheduleInfo.reservedEndTime, dateFormat).format(
            dateFormat
          );
    if (
      startTime < dogwalkerScheduleInfo.reservedStartTime ||
      endTime < dogwalkerScheduleInfo.reservedStartTime
    ) {
      notification.warning({
        message: '예약 불가능 시간',
        description: '예약 불가능한 시간입니다.',
        duration: 1.0,
      });
      return;
    }
    if (
      startTime > dogwalkerScheduleInfo.reservedEndTime ||
      endTime > dogwalkerScheduleInfo.reservedEndTime
    ) {
      notification.warning({
        message: '예약 불가능 시간',
        description: '예약 불가능한 시간입니다.',
        duration: 1.0,
      });
      return;
    }
    const param = {
      startTime: startTime,
      endTime: endTime,
      amount: finalPrice,
      dogwalkerScheduleId: dogwalkerScheduleInfo.id,
      userId: userInfo.userId,
      userName: userInfo.userNm,
      dogwalkerId: dogwalkerScheduleInfo.dogwalkerId,
      dogwalkerName: dogwalkerScheduleInfo.dogwalkerName,
    };
    createReservation(param)
      .then(result => {
        notification.success({
          message: '예약 성공',
          description: '예약 되었습니다. ',
          duration: 1.0,
        });
        const newRow = dogWalkerList.map(item =>
          item.id === dogwalkerScheduleInfo.id
            ? { ...item, reservedYn: 'Y' }
            : item
        );
        dispatch(setDogWalkerList(newRow));
        dispatch(setReservationDetailId(result.data?.reservedId));
        navigate('/reservationDetail');
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
        dispatch(setDogwalkerScheduleInfo(undefined));
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
    if (
      current < moment(dogwalkerScheduleInfo?.reservedStartTime, dateFormat)
    ) {
      return true;
    } else if (
      current > moment(dogwalkerScheduleInfo?.reservedEndTime, dateFormat)
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

    if (type === 'start') {
      return {
        disabledHours: () => range(0, startHour),
      };
    }

    return {
      disabledHours: () => range(endHour, 24),
    };
  };

  const onOk = value => {};
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
        value={dates}
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
