import { PetFriendsPostService } from "../service/PetFrinedsPostService";
import { PetFrinedsDeleteService } from "../service/PetFrinedsDeleteService";
import { PetFrinedsPutService } from "../service/PetFrinedsPutService";
import { PetFrinedsGetService } from "../service/PetFrinedsGetService";

export const registData = async (params) => {
  const response = await PetFriendsPostService("/dogWalker", params);
  if (response && response.status === 200) {
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
export const deleteData = async (params) => {
  const response = await PetFrinedsDeleteService("/dogWalker", params);
  if (response && response.status === 200) {
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
export const getData = async (params) => {
  const response = await PetFrinedsGetService("/dogWalker", params);
  if (response && response.status === 200) {
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
export const putData = async (params) => {
  const response = await PetFrinedsPutService("/dogWalker", params);
  if (response && response.status === 200) {
    return { status: response.status, data: response.data };
  } else {
    return { status: response.status, resultMsg: response.data };
  }
};
