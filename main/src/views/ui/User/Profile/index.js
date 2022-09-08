import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import LoginComponent from '../../../../components/user/Login';
import ProfileComponent from '../../../../components/user/Profile';
const Profile = () => {
  return (
    <div className="userContainer">
      <Col lg="6" span={14}>
        <ProfileComponent />
      </Col>
    </div>
  );
};

export default Profile;
