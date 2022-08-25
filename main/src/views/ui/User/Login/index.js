import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import LoginComponent from '../../../../components/user/Login';
const Login = () => {
  return (
    <div className="userContainer">
      <Col lg="6" span={14}>
        <LoginComponent />
      </Col>
    </div>
  );
};

export default Login;
