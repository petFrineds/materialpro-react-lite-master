import { PetFriendsPostService } from '../service/PetFrinedsPostService';
import { PetFrinedsDeleteService } from '../service/PetFrinedsDeleteService';
import { PetFrinedsPutService } from '../service/PetFrinedsPutService';
import { PetFrinedsGetService } from '../service/PetFrinedsGetService';
import { PetFrinedsPostServiceWithHeader } from '../service/PetFrinedsPostServiceWithHeader';
export const registerUser = async params => {
  const response = await PetFriendsPostService('/auths/signup', params);
  if (response && response.status === 200) {
    console.log({ status: response.status, data: response.data });
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.message };
  }
};

export const loginUser = async params => {
  let username = 'petfriends';
  let password = 'petfriends';
  const token = `${username}:${password}`;
  const encodedToken = Buffer.from(token).toString('base64');
  const header = { Authorization: 'Basic ' + encodedToken };
  const response = await PetFrinedsPostServiceWithHeader(
    '/oauth/token',
    params,
    header
  );
  if (response && response.status === 200) {
    console.log({ status: response.status, data: response.data });
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.message };
  }
};
export const getUserInfo = async params => {
  const response = await PetFrinedsGetService('/userInfos/' + params);
  if (response && response.status === 200) {
    console.log({ status: response.status, data: response.data });
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.message };
  }
};
export const checkUserId = async userId => {
  const response = await PetFrinedsGetService('/userInfos/check/' + userId);
  if (response && response.status === 200) {
    console.log({ status: response.status, data: response.data });
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.message };
  }
};
