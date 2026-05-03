import API from "../api/axios";

export const registerOwner = (data) => {
  return API.post("/owner/register", data);
};

export const loginOwner = (data) => {
  return API.post("/owner/login", data);
};
