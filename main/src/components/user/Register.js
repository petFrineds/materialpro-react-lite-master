import React, { useState, useEffect } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import NumericInput from '../common/NumericInput';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Space,
  notification,
} from 'antd';

import { Card, CardBody, CardTitle } from 'reactstrap';
import { registerUser } from '../../api/AuthApi';
import { useSelector, useDispatch } from 'react-redux';

const Register = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const onClickRegisterBtn = () => {
    form.validateFields().then(values => {
      console.log(values);
      const params = {
        userId: values.userId,
        password: values.password,
        userNm: values.userNm,
        telNo: values.telNo,
      };
      registerUser(params)
        .then(result => {
          notification.open({
            message: '회원가입 성공',
            description: result.data + ' 회원가입 되었습니다.',
          });
        })
        .catch(error => {
          console.log(error);
          notification.open({
            message: '회원가입 실패',
            description: error.response.data.message,
          });
        });
    });
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">회원 가입</CardTitle>
          <Form
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            layout="horizontal"
            size="middle"
          >
            <Form.Item
              label="ID"
              name="userId"
              rules={[{ required: true, message: 'ID를 입력해주세요.' }]}
            >
              <div className="registerId">
                <Input className="registerIdInput" />
                <Button className="registerIdBtn">중복확인</Button>
              </div>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
            >
              <Input.Password placeholder="input password" />
            </Form.Item>
            <Form.Item
              label="Password 확인"
              name="PasswordConfirm"
              rules={[
                { required: true, message: '비밀번호 확인을 입력해주세요.' },
              ]}
            >
              <Input.Password
                placeholder="input password"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              label="이름"
              name="userNm"
              rules={[{ required: true, message: '이름을 입력해주세요.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="전화번호"
              name="telNo"
              rules={[{ required: true, message: '전화번호를 입력해주세요.' }]}
            >
              <Input />
              {/*  <NumericInput inputText={phoneNum} onChange={setPhoneNum} />*/}
            </Form.Item>
            <div className="logBtn">
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={onClickRegisterBtn}
              >
                등록
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
