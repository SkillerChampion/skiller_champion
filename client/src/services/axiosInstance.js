import axios from 'axios';
import { generateJwtToken } from './hederaService';
import { X_ACCOUNT_ID, AUTHORIZATION, HASH_CONNECT_KEYS } from '../utils/constants';

let instance;

export const NODE_BE_API = () => {
  instance = axios.create({
    baseURL: process.env.REACT_APP_NODE_BE_API,
    headers: {}
  });

  return instance;
};

export const NODE_BE_API_ONLY = axios.create({
  baseURL: process.env.REACT_APP_NODE_BE_API,
  headers: {}
});

export const NODE_BE_OPEN_SOURCE_API = axios.create({
  baseURL: process.env.REACT_APP_NODE_BE_OPEN_SOURCE_API
});

export const HEDERA_NODE_API = axios.create({
  baseURL: process.env.REACT_APP_HEDERA_NODE_API
});

export const setNodeBeHeadersAndExecute = async ({ accountId }, callback) => {
  const configReq = { [HASH_CONNECT_KEYS.ACCOUNT_ID]: accountId };
  try {
    // Add an interceptor to modify headers
    instance.interceptors.request.use(
      async (config) => {
        try {
          const { token } = await generateJwtToken(configReq);
          console.log('Token 22- ', token);

          // Modify headers here
          config.headers[AUTHORIZATION] = token;
          config.headers[X_ACCOUNT_ID] = accountId;
          console.log('Token 33- ', config.headers);

          return config;
        } catch (error) {
          console.log('Error intercepting Headers - ', error);
          // re-throw error to prevent infinite loop
          throw error;
        }
      },
      (error) => {
        // handle request error
        console.error(error);

        // re-throw error to prevent infinite loop
        return Promise.reject(error);
      }
    );

    const data = await callback();
    return data;
  } catch (error) {
    console.log('Error getting Token - ', error);
  }
};
