import React, { useState, useEffect, useCallback } from 'react';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import NumericInput from '../common/NumericInput';
import { Button, Form, Input, notification, message, Upload } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardBody, CardTitle } from 'reactstrap';
import { registerUser, checkUserId, postImg } from '../../api/AuthApi';
import { useSelector, useDispatch } from 'react-redux';

const Register = () => {
  const [form] = Form.useForm();
  const [phoneNum, setPhoneNum] = useState('');
  const navigate = useNavigate();
  const [userIdValidation, setUserIdValidation] = useState(false);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [register, setRegister] = useState(false);
  const onClickRegisterBtn = () => {
    if (!userIdValidation) {
      notification.warning({
        message: '아이디 중복체크',
        description: '아이디 중복 확인을 먼저 해주세요.',
        duration: 1.0,
      });
      return;
    }
    form.validateFields().then(values => {
      const params = {
        userId: values.userId,
        password: values.password,
        userNm: values.userNm,
        telNo: values.telNo,
        career: values.career,
      };
      const bodyFormData = new FormData();
      bodyFormData.append('multipartFile', imageUrl);
      registerUser(params)
        .then(result => {
          notification.success({
            message: '회원가입 성공',
            description:
              result.data +
              ' 회원가입 되었습니다. 프로필 사진을 업로드해주세요.',
            duration: 1.0,
          });
          setRegister(true);
          // navigate('/');
        })
        .catch(error => {
          notification.error({
            message: '회원가입 실패',
            description: error,
            duration: 1.0,
          });
        });
    });
  };
  // passwordCheck 유효성 검사
  const validatePasswordCheck = useCallback((_, value) => {
    if (
      form.getFieldValue('password') &&
      form.getFieldValue('password') !== value
    ) {
      return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
    }
    return Promise.resolve();
  }, []);
  const validatePhoneCheck = useCallback((_, value) => {
    if (value.length !== 11 || Number.isNaN(value)) {
      return Promise.reject(new Error('올바른 전화번호를 입력해주세요.'));
    }
    return Promise.resolve();
  }, []);
  const onClickCheckBtn = () => {
    checkUserId(userId)
      .then(result => {
        notification.error({
          message: '아이디 사용 불가능',
          description: '중복된 아이디가 존재합니다.',
          duration: 1.0,
        });
      })
      .catch(error => {
        if (error.response?.status === 500) {
          notification.success({
            message: '아이디 사용 가능',
            description: userId + ' 사용가능한 아이디 입니다.',
            duration: 1.0,
          });
          setUserIdValidation(true);
          return;
        } else {
          notification.error({
            message: '아이디 사용 불가능',
            description: '중복된 아이디가 존재합니다.',
            duration: 1.0,
          });
        }
      });
  };
  const onChangeUserId = e => {
    setUserId(e.target.value);
    setUserIdValidation(false);
  };
  const handleImage = async e => {
    const file = e.target.files[0];
    const err = checkImage(file);

    if (err) {
      notification.warning({
        message: '사진 업로드 에러',
        description: err,
        duration: 1.0,
      });
      return;
    }
    if (file) {
      let preview = document.getElementById('preview');
      preview.src = URL.createObjectURL(file);
    }
    setImageUrl(file);
  };
  const checkImage = file => {
    let err = '';

    if (!file) {
      err = 'File does not exist.';
      return err;
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      err = 'Image format is incorrect.';
    }

    return err;
  };
  const handleImageDelete = () => {
    setImageUrl('');
    let preview = document.getElementById('preview');
    preview.src = '';
  };
  const onClickImgUploadBtn = () => {
    if (imageUrl === null || imageUrl === '') {
      notification.warning({
        message: '이미지 없음',
        description: '이미지를 업로드 해주세요.',
        duration: 1.0,
      });
      return;
    }

    const bodyFormData = new FormData();
    bodyFormData.append('file', imageUrl);
    bodyFormData.append('user_id', userId);
    postImg(bodyFormData)
      .then(result => {
        notification.success({
          message: '프로필 업로드 성공',
          description: result.data + '프로필 사진을 성공적으로 업로드했습니다.',
          duration: 1.0,
        });
        navigate('/');
      })
      .catch(error => {
        notification.error({
          message: '프로필 업로드 실패',
          description: error,
          duration: 1.0,
        });
      });
  };

  return (
    <div>
      <Card>
        <CardBody>
          {!register && (
            <>
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
                    <Input
                      className="registerIdInput"
                      onChange={onChangeUserId}
                    />
                    <Button className="registerIdBtn" onClick={onClickCheckBtn}>
                      중복확인
                    </Button>
                  </div>
                </Form.Item>
                <Form.Item
                  label="password"
                  name="password"
                  rules={[
                    { required: true, message: '비밀번호를 입력해주세요.' },
                  ]}
                >
                  <Input.Password placeholder="input password" />
                </Form.Item>
                <Form.Item
                  label="Password 확인"
                  name="PasswordConfirm"
                  rules={[
                    { required: true, message: '비밀번호확인을 입력해주세요.' },
                    { validator: validatePasswordCheck },
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
                  label="경력(년)"
                  name="career"
                  rules={[{ required: true, message: '경력을 입력해주세요.' }]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="전화번호"
                  name="telNo"
                  rules={[
                    { required: true, message: '전화번호를 입력해주세요.' },
                    { validator: validatePhoneCheck },
                  ]}
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
            </>
          )}
          {register && (
            <>
              <div>{userId}의 프로필 사진을 업로드 해주세요.</div>
              <div
                className="show_media"
                style={{ display: imageUrl ? 'grid' : 'none' }}
              >
                dd
                <div id="file_media">
                  <img id="preview" src="" alt="imageURL" />
                  <Button onClick={handleImageDelete}>취소</Button>
                </div>
              </div>
              <div className="file_upload">
                <i className="fas fa-image text-danger"></i>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={handleImage}
                />
              </div>
              dd
              <Button onClick={onClickImgUploadBtn}>업로드</Button>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
