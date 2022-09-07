import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Collapse,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from 'reactstrap';
import { ReactComponent as LogoWhite } from '../assets/images/logos/materialprowhite.svg';
import user1 from '../assets/images/users/user4.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { initReduxAll } from '../components/common/InitRedux';
import { setAlarmRead } from '../api/NotificationApi';
import { setMyAlarmList, setMyAlarmCount } from '../store/Alarm';
import { Badge, Avatar, Tag, Card } from 'antd';
import moment from 'moment';
import axios from 'axios';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const userInfo = useSelector(state => state.user.get('userInfo'));
  const myAlarmCount = useSelector(state => state.alarm.get('alarmCount'));
  const myAlarmList = useSelector(state => state.alarm.get('myAlarmList'));
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (dropdownOpen && myAlarmList) {
      if (myAlarmList.find(item => item.readYn === 'N') === undefined) return;
      setAlarmRead(sessionStorage.getItem('userId'))
        .then(result => {
          console.log(result);

          dispatch(setMyAlarmCount(0));
        })
        .catch(error => {
          console.log('setAlarmRead >>>' + error);
        });
    }
  }, [dropdownOpen]);
  const showMobilemenu = () => {
    document.getElementById('sidebarArea').classList.toggle('showSidebar');
  };
  const onClickLogOut = () => {
    axios.defaults.headers.common['Authorization'] = '';

    sessionStorage.clear();
    initReduxAll(dispatch);
    navigate('/');
  };

  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">PET FRIENDS</div>
        <NavbarBrand href="/">
          <LogoWhite className=" d-lg-none" />
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>
      {sessionStorage.getItem('userId') && (
        <div className="align-items-right">
          <Collapse navbar isOpen={isOpen}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle color="transparent">
                <Badge count={myAlarmCount || 0}>
                  <Avatar
                    src={user1}
                    alt="profile"
                    className="rounded-circle"
                    width="30"
                  ></Avatar>
                </Badge>
              </DropdownToggle>
              <DropdownMenu>
                {myAlarmList && (
                  <>
                    {myAlarmList?.map((item, index) => (
                      <DropdownItem key={index}>
                        {item.readYn === 'N' && (
                          <Badge.Ribbon text="New" color="red">
                            <Card title="알림" size="small">
                              {item.message}
                              <div className="alarmDateDiv">
                                <span className="alarmDate">
                                  {moment(item.regDate).format(
                                    'YYYY-MM-DD HH:mm'
                                  )}
                                </span>
                              </div>
                            </Card>
                          </Badge.Ribbon>
                        )}
                        {item.readYn === 'Y' && (
                          <Card title="알림" size="small">
                            {item.message}
                            <div className="alarmDateDiv">
                              <span className="alarmDate">
                                {moment(item.regDate).format(
                                  'YYYY-MM-DD HH:mm'
                                )}
                              </span>
                            </div>
                          </Card>
                        )}
                      </DropdownItem>
                    ))}
                    <DropdownItem divider />
                  </>
                )}

                <DropdownItem
                  onClick={onClickLogOut}
                  style={{ textAlign: 'right' }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Collapse>
        </div>
      )}
      {sessionStorage.getItem('userId') === null && (
        <div className="align-items-right black">
          <Link to="/login">
            <i
              className="bi bi-box-arrow-in-right"
              style={{ color: 'black' }}
            ></i>
            <span className="ms-3 d-inline-block" style={{ color: 'black' }}>
              Login
            </span>
          </Link>
        </div>
      )}
    </Navbar>
  );
};

export default Header;
