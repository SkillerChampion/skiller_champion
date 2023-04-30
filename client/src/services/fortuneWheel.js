import { NODE_BE_OPEN_SOURCE_API as axios } from './axiosInstance';

export const getAllWheelDataList = () => {
  console.log(
    'opensource api - ',
    process.env.REACT_APP_NODE_BE_OPEN_SOURCE_API,
    process.env.DATABASE
  );
  return axios.get(`/fortuneWheel`).then((res) => res.data);
};

export const getRandomSlice = (betAmount) => {
  return axios.post(`/fortuneWheel/rotateWheel`, { betAmount }).then((res) => res.data);
};
