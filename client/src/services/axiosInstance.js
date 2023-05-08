import axios from 'axios';
import { generateJwtToken } from './hederaService';
import { HASH_CONNECT_KEYS } from '../utils/constants';
import { encryptData } from '../utils/helperFunctions';

export const NODE_BE_API = axios.create({
  baseURL: process.env.REACT_APP_NODE_BE_API,
  headers: {}
});

export const NODE_BE_OPEN_SOURCE_API = axios.create({
  baseURL: process.env.REACT_APP_NODE_BE_OPEN_SOURCE_API
});

export const HEDERA_NODE_API = axios.create({
  baseURL: process.env.REACT_APP_HEDERA_NODE_API
});

export const getAuthToken = async (accountId) => {
  const configReq = { [HASH_CONNECT_KEYS.ACCOUNT_ID]: accountId };

  try {
    const { token = '' } = await generateJwtToken(configReq);
    const encryptToken = await encryptData(token);

    return encryptToken;
  } catch (error) {
    console.log('Error getting Token - ', error);
  }
};

// export const getTokenForAuth = async (accountId) => {
//   const configReq = { [HASH_CONNECT_KEYS.ACCOUNT_ID]: accountId };

//   try {
//     const { token = '' } = await generateJwtToken(configReq);
//     const encryptToken = await encryptData(token);

//     console.log('encryptTokenencryptToken', encryptToken);
//     return encryptToken;
//   } catch (error) {
//     console.log('Error getting Token - ', error);
//   }
// };
