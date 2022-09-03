import axios from 'axios';
import { notification } from 'antd';

export const PetFriendsPostService = (url, data) => {
  let BaseUrl = `${process.env.REACT_APP_PET_FRIENDS_BASE_URL}`;
  const RequestUrl = `${BaseUrl}${url}`;
  const errIgnoreList = [200, 201, 204];

  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(response => {
        if (!errIgnoreList.includes(response.status)) {
          console.log('PetFriendsPostService 시스템 내부 ERROR >> 500');
        }
        resolve(response);
      })
      .catch(error => {
        console.log('PetFriendsPostService 시스템 내부 ERROR >>', error);
        reject(error);
      });
  });
};
