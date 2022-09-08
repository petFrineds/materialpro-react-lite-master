import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { notification } from 'antd';
let isTokenRefreshing = false;
let refreshSubscribers = [];
const onTokenRefreshed = accessToken => {
  refreshSubscribers.map(callback => callback(accessToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = callback => {
  refreshSubscribers.push(callback);
};
const onClickLogOut = () => {
  axios.defaults.headers.common['Authorization'] = '';

  sessionStorage.clear();
};
axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401) {
      if (!isTokenRefreshing) {
        if (error.response?.data?.error === 'invalid_token') {
          isTokenRefreshing = true;
          notification.error({
            message: '세션 만료',
            description: '세션이 만료되어 로그아웃 되었습니다.',
            duration: 1.0,
          });
          onClickLogOut();
          const navigate = useNavigate();

          navigate('/login');
          isTokenRefreshing = false;
        }

        const retryOriginalRequest = new Promise(resolve => {
          addRefreshSubscriber(accessToken => {
            originalRequest.headers.Authorization = 'Bearer ' + accessToken;
            resolve(axios(originalRequest));
          });
        });
        return retryOriginalRequest;
      }
    }
    return Promise.reject(error);
  }
);
export default axios;
