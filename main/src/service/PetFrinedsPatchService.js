import axios from 'axios';
import { notification } from 'antd';

export const PetFrinedsPatchService = url => {
  let BaseUrl = `${process.env.REACT_APP_PET_FRIENDS_BASE_URL}`;
  const RequestUrl = `${BaseUrl}${url}`;
  const errIgnoreList = [200, 201];

  return new Promise((resolve, reject) => {
    axios
      .patch(RequestUrl)
      .then(response => {
        if (!response?.data) {
          notification.open({
            message: '시스템 내부 에러',
            description: 'PetFrinedsPatchService 시스템 내부 ERROR >> 500',
          });
          console.log('PetFrinedsPatchService 시스템 내부 ERROR >> 500');
        }
        resolve(response);
      })
      .catch(error => {
        notification.open({
          message: '시스템 내부 에러',
          description: 'PetFrinedsPatchService 시스템 내부 ERROR >>' + error,
        });
        console.log('PetFrinedsPatchService 시스템 내부 ERROR >>', error);
        reject(error);
      });
  });
};
