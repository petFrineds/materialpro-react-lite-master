import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Themeroutes from './routes/Router';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from './store/User';
import axios from 'axios';
import { getMyInfo } from './api/AuthApi';
import './assets/css/dogWalker/dogWalker.css';
import './assets/css/user/user.css';

const App = () => {
  const routing = useRoutes(Themeroutes);
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);
  axios.defaults.headers.common['Accept'] = '*/*';
  axios.defaults.headers.common['Content-Type'] = 'text/html;charset=utf-8';
  useEffect(() => {
    if (sessionStorage.getItem('userId') === null) {
      setIsLogin(false);
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('accessToken');
    } else {
      setIsLogin(true);
      axios.defaults.headers.common['Authorization'] =
        'bearer ' + sessionStorage.getItem('accessToken');
    }
  });
  return <div className="dark">{routing}</div>;
};
export default App;
