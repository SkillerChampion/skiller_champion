import { ARRAY_KEYS, HCS_TYPES, HCS_KEYS } from './constants';
import { toast } from 'react-toastify';
import { AES } from 'crypto-js';
import { submitHcsMessage } from '../services/hederaService';

// Private Keys and Token Ids
export const getTreasuryAccountId = () => process.env.REACT_APP_TREASURY_ACCOUNT_ID;

export const getTreasuryPublicKey = () => process.env.REACT_APP_TREASURY_PUBLIC_KEY;
export const getPlatinumPassTokenId = () => process.env.REACT_APP_PLATINUM_PASS_TOKEN_ID;
export const getGoldPassTokenId = () => process.env.REACT_APP_GOLD_PASS_TOKEN_ID;
export const getSilverPassTokenId = () => process.env.REACT_APP_SILVER_PASS_TOKEN_ID;
export const getFortuneWheelTopicId = () => process.env.REACT_APP_TOPIC_ID_FORTUNE_WHEEL;
export const getHashScanUrl = () => process.env.REACT_APP_HASHSCAN_URL;
export const getEncryptionKey = () => process.env.REACT_APP_ENCRYPTION_KEY;

export const scrollToTop = (smooth = false) => {
  if (smooth) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo(0, 0);
  }
};

export const isPositiveNumber = (input) => {
  if (typeof input === 'number' && input > 0) return true;
  return false;
};

export const isValidNftSerialNumber = (input) => {
  if (typeof input === 'number' && input > 1) return true;
  return false;
};

export const setCssVariable = (key, value) => {
  document.querySelector(':root').style.setProperty(key, `${value}deg`);
};

// Fn to evaluate Profit/loss chances for 1800 wheel
export const wheelRevenueEstimator = (wheelData = [], initialPrice) => {
  let profit = 0;
  let loss = 0;

  for (let i = 0; i < 10; i++) {
    const random = Math.floor(Math.random() * wheelData.length);
    const randomSlice = wheelData[random];

    if (randomSlice[ARRAY_KEYS.VALUE] <= initialPrice) {
      profit = profit + (initialPrice - randomSlice[ARRAY_KEYS.VALUE]);
    } else {
      loss = loss + (randomSlice[ARRAY_KEYS.VALUE] - initialPrice);
    }
  }

  console.log('profit - ', profit);
  console.log('loss - ', loss);
  console.log('overal - ', profit - loss);
};

export const displayErrors = (errors = []) => {
  errors.forEach((item) => toast.error(item.msg));
};

export const isArray = (arr) => {
  return Array.isArray(arr) && arr?.length > 0 ? true : false;
};

export const isArrayReady = (arr) => {
  return isArray(arr) ? arr : [];
};

export const submitBuyPassHcsMsg = async (
  passType,
  passAmount,
  passSerialNum,
  tokenId,
  status,
  txnId,
  accountId
) => {
  const topicId = getFortuneWheelTopicId();

  const msg = {
    [HCS_KEYS.type]: HCS_TYPES.BUY_PASSES,
    [HCS_KEYS.token_id]: tokenId,
    [HCS_KEYS.pass_type]: passType,
    [HCS_KEYS.pass_amount]: passAmount,
    [HCS_KEYS.pass_serial_number]: passSerialNum,
    [HCS_KEYS.status]: status,
    [HCS_KEYS.txn_id]: txnId
  };

  const res = await submitHcsMessage(topicId, msg, accountId);

  return res;
};

export const submitUsePassHcsMsg = async (
  passType,
  passAmount,
  passSerialNum,
  tokenId,
  status,
  winnerAmount,
  txnId,
  nftTransferTxnId,
  accountId
) => {
  const topicId = getFortuneWheelTopicId();

  const msg = {
    [HCS_KEYS.type]: HCS_TYPES.USE_PASSES,
    [HCS_KEYS.token_id]: tokenId,
    [HCS_KEYS.pass_type]: passType,
    [HCS_KEYS.pass_amount]: passAmount,
    [HCS_KEYS.pass_serial_number]: passSerialNum,
    [HCS_KEYS.status]: status,
    [HCS_KEYS.winner_amount]: winnerAmount,
    [HCS_KEYS.txn_id]: txnId,
    [HCS_KEYS.nft_transfer_txn_id]: nftTransferTxnId
  };

  const res = await submitHcsMessage(topicId, msg, accountId);

  return res;
};

export const submitUsePassFailedHcsMsg = async (
  passType,
  passAmount,
  passSerialNum,
  tokenId,
  status,
  errorMsg,
  txnId,
  nftTransferTxnId,
  accountId
) => {
  const topicId = getFortuneWheelTopicId();

  const getError = errorMsg?.stack;

  const msg = {
    [HCS_KEYS.type]: HCS_TYPES.USE_PASSES,
    [HCS_KEYS.token_id]: tokenId,
    [HCS_KEYS.pass_type]: passType,
    [HCS_KEYS.pass_amount]: passAmount,
    [HCS_KEYS.pass_serial_number]: passSerialNum,
    [HCS_KEYS.status]: status,
    [HCS_KEYS.error_msg]: getError,
    [HCS_KEYS.txn_id]: txnId,
    [HCS_KEYS.nft_transfer_txn_id]: nftTransferTxnId
  };

  const res = await submitHcsMessage(topicId, msg, accountId);

  return res;
};

export const linkToHashScanTxn = (timeStamp = '') => {
  const url = getHashScanUrl();
  return `${url}/transaction/${timeStamp}`;
};

export const encryptData = async (text) => {
  const data = await AES.encrypt(text, getEncryptionKey());
  return data;
};
