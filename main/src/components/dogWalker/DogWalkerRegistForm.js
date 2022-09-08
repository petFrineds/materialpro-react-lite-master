import { Form, Input, Select, DatePicker, Space } from 'antd';
import moment from 'moment';

import React, { useState } from 'react';
const { Option } = Select;
const { RangePicker } = DatePicker;

const DogWalkerRegistForm = ({ form }) => {
  const [place, setPlace] = useState('');
  const [dates, setDates] = useState(null);
  const [dateValue, setDateValue] = useState(null);
  const walkingPlace = [
    '서울_종로구',
    '서울_중구',
    '서울_성동구',
    '서울_광진구',
    '서울_용산구',
    '서울_동대문구',
    '서울_중랑구',
    '서울_성북구',
    '서울_강북구',
    '서울_도봉구',
    '서울_노원구',
    '서울_은평구',
    '서울_서대문구',
    '서울_마포구',
    '서울_양천구',
    '서울_강서구',
    '서울_구로구',
    '서울_금천구',
    '서울_영등포구',
    '서울_동작구',
    '서울_관악구',
    '서울_서초구',
    '서울_강남구',
    '서울_송파구',
    '서울_강동구',
  ];
  const onPlaceChange = value => {
    setPlace(value);
  };

  const onOk = value => {};
  const disabledDate = current => {
    // Can not select days before today and today
    if (!dates) {
      return current && current < moment().startOf('day');
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 0;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
    return !!tooEarly || !!tooLate;
  };
  const range = (start, end) => {
    const result = [];

    for (let i = start; i < end; i += 1) {
      result.push(i);
    }

    return result;
  };

  return (
    <Form form={form}>
      <Form.Item
        name="place"
        label="지역"
        rules={[{ required: true, message: '지역을 선택해주세요.' }]}
      >
        <Select
          placeholder="지역을 선택해주세요."
          onChange={onPlaceChange}
          allowClear
        >
          {walkingPlace.map((item, idx) => {
            return (
              <Option key={idx} value={item}>
                {item}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="walkingtime"
        label="산책가능시간"
        rules={[{ required: true, message: '산책 가능 시간을 선택해주세요.' }]}
      >
        <RangePicker
          showTime={{
            format: 'HH:mm',
          }}
          format="YYYY-MM-DD HH:mm"
          onCalendarChange={val => setDates(val)}
          onOk={onOk}
          minuteStep={30}
          onChange={val => setDateValue(val)}
          disabledDate={disabledDate}
        />
      </Form.Item>
      <Form.Item
        name="price"
        label="금액(시급)"
        rules={[{ required: true, message: '가격을 입력해주세요.' }]}
      >
        <Input prefix="₩" type="number" />
      </Form.Item>
    </Form>
  );
};

export default DogWalkerRegistForm;
