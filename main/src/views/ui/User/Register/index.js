import React, { useState, useEffect } from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import RegisterComponent from '../../../../components/user/Register';
const Register = () => {
  return (
    <div className="registerContainer">
      <Col lg="10">
        <RegisterComponent />
      </Col>
    </div>
  );
};

export default Register;
