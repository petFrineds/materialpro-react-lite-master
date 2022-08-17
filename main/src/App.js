import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Themeroutes from './routes/Router';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from './store/User';
import axios from 'axios';

const App = () => {
  const routing = useRoutes(Themeroutes);
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);
  axios.defaults.headers.common['Accept'] = '*/*';
  axios.defaults.headers.common['Content-Type'] = 'text/html;charset=utf-8';
  useEffect(() => {
    if (sessionStorage.getItem('user_id') === null) {
      console.log('isLogin ?? :: ', isLogin);
      const userInfo = {
        userId: 'soya95',
        userName: 'SOMINA',
        telNo: '010-9749-9959',
        pointAmount: 1000,
        useCount: 4,
      };
      dispatch(setUserInfo(userInfo));
      sessionStorage.setItem('user_id', userInfo.userId);
    } else {
      setIsLogin(true);
      console.log('isLogin ?? :: ', isLogin);
    }
  });
  return <div className="dark">{routing}</div>;
};
export default App;
