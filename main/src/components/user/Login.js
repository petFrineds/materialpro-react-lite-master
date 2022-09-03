import React, { useState, useEffect } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
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
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardBody, CardTitle } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/User';
import { loginUser, getUserInfo, registerUser } from '../../api/AuthApi';
import axios from 'axios';
const Login = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickRegisterBtn = () => {
    form.validateFields().then(values => {
      console.log(values);

      const userInfo = {
        userId: values.userId,
        password: values.password,
      };
      loginUser(userInfo)
        .then(result => {
          sessionStorage.setItem('userId', userInfo.userId);
          sessionStorage.setItem('accessToken', result.data.accessToken);
          notification.success({
            message: '로그인 성공',
            description: '로그인 되었습니다.',
            duration: 1.0,
          });

          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + sessionStorage.getItem('accessToken');

          navigate('/');
        })
        .catch(error => {
          sessionStorage.clear();
          notification.error({
            message: '로그인 실패',
            description: error?.response?.data?.message,
            duration: 1.0,
          });
        });
    });
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">로그인</CardTitle>
          <Form
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 8,
            }}
            layout="horizontal"
            size="middle"
          >
            <Form.Item
              label="ID"
              name="userId"
              rules={[{ required: true, message: 'ID를 입력해주세요.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="password"
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
            >
              <Input.Password
                placeholder="input password"
                onPressEnter={onClickRegisterBtn}
              />
            </Form.Item>
          </Form>
          <div className="logBtn">
            <Space direction="horizontal">
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={onClickRegisterBtn}
              >
                로그인
              </Button>
              <Link to="/register">
                <Button key="submit" type="primary" htmlType="submit">
                  회원가입
                </Button>
              </Link>
            </Space>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
