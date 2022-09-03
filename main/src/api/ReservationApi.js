import { PetFriendsPostService } from '../service/PetFrinedsPostService';
import { PetFrinedsDeleteService } from '../service/PetFrinedsDeleteService';
import { PetFrinedsPutService } from '../service/PetFrinedsPutService';
import { PetFrinedsGetService } from '../service/PetFrinedsGetService';
import { PetFrinedsPatchService } from '../service/PetFrinedsPatchService';

export const getAllMyReservation = async userId => {
  const response = await PetFrinedsGetService('/reservations/users/' + userId);
  if (response && response.status === 200) {
    console.log({ status: response.status, data: response.data });
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
export const getReservationDetail = async reservationId => {
  const response = await PetFrinedsGetService('/reservations/' + reservationId);
  if (response && response.status === 200) {
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
export const cancelReservation = async param => {
  const response = await PetFrinedsPatchService(
    '/reservations/' + param.reservedId,
    param
  );
  if (response && response.status === 200) {
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
export const createReservation = async param => {
  const response = await PetFriendsPostService('/reservations', param);
  if (response && response.status === 200) {
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
