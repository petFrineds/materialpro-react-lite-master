import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Themeroutes from './routes/Router';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from './store/User';
import axios from 'axios';
import { getUserInfo } from './api/AuthApi';
import './assets/css/dogWalker/dogWalker.css';
import './assets/css/user/user.css';
import './assets/css/header/header.css';
import './assets/css/common/Button.css';
import { getMyAlarmCount, getMyAlarm } from './api/AlarmApi';
import { setMyAlarmCount, setMyAlarmList } from './store/Alarm';
const App = () => {
  const routing = useRoutes(Themeroutes);
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);
  axios.defaults.headers.common['Accept'] = '*/*';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  useEffect(() => {
    if (sessionStorage.getItem('userId') === null) {
      setIsLogin(false);
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('accessToken');
    } else {
      setIsLogin(true);
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + sessionStorage.getItem('accessToken');

      getUserInfo(sessionStorage.getItem('userId'))
        .then(result2 => {
          dispatch(setUserInfo(result2.data));
        })
        .catch(error => {
          console.log('getUserInfo Error');
        });
      getMyAlarmCount(sessionStorage.getItem('userId'))
        .then(result => {
          dispatch(setMyAlarmCount(result.data));
        })
        .catch(error => {
          console.log('getMyAlarmCount Error');
        });
      getMyAlarm(sessionStorage.getItem('userId'))
        .then(result => {
          dispatch(setMyAlarmList(result.data));
        })
        .catch(error => {
          console.log('getMyAlarm Error');
        });
    }
  }, [sessionStorage.getItem('userId')]);
  return <div className="dark">{routing}</div>;
};
export default App;
