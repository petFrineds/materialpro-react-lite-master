import { PetFriendsPostService } from '../service/PetFrinedsPostService';
import { PetFrinedsDeleteService } from '../service/PetFrinedsDeleteService';
import { PetFrinedsPutService } from '../service/PetFrinedsPutService';
import { PetFrinedsGetService } from '../service/PetFrinedsGetService';
import { PetFrinedsPostServiceWithHeader } from '../service/PetFrinedsPostServiceWithHeader';
import { PetFrinedsPatchService } from '../service/PetFrinedsPatchService';
export const getMyAlarm = async userId => {
  const response = await PetFrinedsGetService('/alarms/' + userId);
  if (response && response.status === 200) {
    console.log({ status: response.status, data: response.data });
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.message };
  }
};

export const setAlarmRead = async params => {
  const response = await PetFrinedsPatchService(
    '/alarms/' + params.userId,
    params
  );
  if (response && response.status === 200) {
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
export const getMyAlarmCount = async userId => {
  const response = await PetFrinedsGetService('/alarms/count/' + userId);
  if (response && response.status === 200) {
    console.log({ status: response.status, data: response.data });
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.message };
  }
};
