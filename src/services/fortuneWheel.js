import { NODE_BE_OPEN_SOURCE_API as axios } from './axiosInstance';

export const getAllWheelDataList = () => {
  return axios.get(`/fortuneWheel`).then((res) => res.data);
};

export const getRandomSlice = (betAmount) => {
  return axios.post(`/fortuneWheel/rotateWheel`, { betAmount }).then((res) => res.data);
};
