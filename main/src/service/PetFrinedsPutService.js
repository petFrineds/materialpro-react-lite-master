import axios from "axios";
import { notification } from "antd";

export const PetFrinedsPutService = (url, data) => {
  let BaseUrl = `${process.env.REACT_APP_PET_FRIENDS_BASE_URL}`;
  const RequestUrl = `${BaseUrl}${url}`;
  const errIgnoreList = [200, 201];

  return new Promise((resolve, reject) => {
    axios
      .put(RequestUrl, data)
      .then((response) => {
        if (response?.data?.successYn === "N") {
          notification.open({
            message: "시스템 내부 에러",
            description: "PetFrinedsDeleteService 시스템 내부 ERROR >> 500",
          });
          console.log("PetFrinedsPutService 시스템 내부 ERROR >> 500");
        }
        resolve(response);
      })
      .catch((error) => {
        notification.open({
          message: "시스템 내부 에러",
          description: "PetFrinedsDeleteService 시스템 내부 ERROR >>" + error,
        });
        console.log("PetFrinedsPutService 시스템 내부 ERROR >>", error);
        reject(error);
      });
  });
};
