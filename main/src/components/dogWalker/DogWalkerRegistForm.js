import { Form, Input, Select, DatePicker, Space } from 'antd';

import React, { useState } from 'react';
const { Option } = Select;
const { RangePicker } = DatePicker;

const DogWalkerRegistForm = ({ form }) => {
  const [place, setPlace] = useState('');
  const onPlaceChange = value => {
    switch (value) {
      case 'SEOUL':
        setPlace('SEOUL');
        return;
      case 'BUNDANG':
        setPlace('BUNDANG');
        return;
      case 'INCHEON':
        setPlace('INCHEON');
        return;
      default:
        return;
    }
  };
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  const onOk = value => {
    console.log('onOk: ', value);
  };
  return (
    <Form form={form}>
      <Form.Item
        name="career"
        label="경력(년)"
        rules={[{ required: true, message: '경력을 입력해주세요.' }]}
      >
        <Input type="number" />
      </Form.Item>
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
          <Option value="SEOUL">서울</Option>
          <Option value="BUNDANG">분당</Option>
          <Option value="INCHEON">이천</Option>
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
          onChange={onChange}
          onOk={onOk}
        />
      </Form.Item>
      <Form.Item
        name="price"
        label="금액"
        rules={[{ required: true, message: '가격을 입력해주세요.' }]}
      >
        <Input prefix="₩" type="number" />
      </Form.Item>
    </Form>
  );
};

export default DogWalkerRegistForm;
