import { PetFriendsPostService } from "../service/PetFrinedsPostService";
import { PetFrinedsDeleteService } from "../service/PetFrinedsDeleteService";
import { PetFrinedsPutService } from "../service/PetFrinedsPutService";
import { PetFrinedsGetService } from "../service/PetFrinedsGetService";

export const registData = async (params) => {
  const response = await PetFriendsPostService("/dogWalkerSchedule", params);
  if (response && response.status === 200) {
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
export const deleteData = async (params) => {
  const response = await PetFrinedsDeleteService("/dogWalkerSchedule", params);
  if (response && response.status === 200) {
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
export const getAllData = async () => {
  const response = await PetFrinedsGetService("/dogWalkerSchedule");
  if (response && response.status === 200) {
    console.log({ status: response.status, data: response.data });
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
export const putData = async (params) => {
  const response = await PetFrinedsPutService("/dogWalkerSchedule", params);
  if (response && response.status === 200) {
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
