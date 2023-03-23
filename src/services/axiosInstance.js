import axios from 'axios';

export const NODE_BE_API = axios.create({
  baseURL: process.env.REACT_APP_NODE_BE_API
});

export const HEDERA_NODE_API = axios.create({
  baseURL: process.env.REACT_APP_HEDERA_NODE_API
});
