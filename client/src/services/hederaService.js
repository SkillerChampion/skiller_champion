/* eslint-disable no-unused-vars */

import { HEDERA_API_KEYS, HCS_KEYS } from '../utils/constants';

import { AUTHORIZATION } from '../utils/constants';
import { NODE_BE_API as axios, HEDERA_NODE_API as hederaApi, getAuthToken } from './axiosInstance';

export const submitHcsMessage = async (topicId, message = {}, accountId, passType) => {
  const token = await getAuthToken(accountId);

  if (token)
    return axios
      .post(`/hederaService/submitHcsMessage?${AUTHORIZATION}=${token}&accountId=${accountId}`, {
        topicId,
        message,
        accountId
      })
      .then((res) => res.data);
};

export const chargeUserAndTransferNft = async (amountHbar, accountId, tokenId, nftSerialNumber) => {
  const token = await getAuthToken(accountId);

  if (token)
    return axios
      .post(`/hederaService/buyPassForHbars?${AUTHORIZATION}=${token}&accountId=${accountId}`, {
        amountHbar,
        accountId,
        tokenId,
        nftSerialNumber
      })
      .then((res) => res.data);
};

export const transferNftToTreasury = async (accountId, tokenId, nftSerialNumber) => {
  if (!accountId || !tokenId || !nftSerialNumber) return;

  const token = await getAuthToken(accountId);

  if (token)
    return axios
      .post(
        `/hederaService/transferNftToTreasury?${AUTHORIZATION}=${token}&accountId=${accountId}`,
        {
          accountId,
          tokenId,
          nftSerialNumber
        }
      )
      .then((res) => res.data);
};

export const associateTokens = async (accountId, tokenId) => {
  const token = await getAuthToken(accountId);

  if (token)
    return axios
      .post(`/hederaService/associateTokens?${AUTHORIZATION}=${token}&accountId=${accountId}`, {
        accountId,
        tokenId
      })
      .then((res) => res.data);
};

export const getTokenRelationshipsByTokenId = (accountId, tokenId) => {
  if (!accountId) return;

  return hederaApi
    .get(`/api/v1/accounts/${accountId}/tokens?token.id=${tokenId}`)
    .then((res) => res.data);
};

export const getNftsSerialNumberFromTreasury = (accountId, tokenId) => {
  if (!accountId) return;

  return hederaApi
    .get(`/api/v1/accounts/${accountId}/nfts?token.id=${tokenId}&limit=100`)
    .then((res) => {
      const getAllNfts = res.data?.nfts ?? [];

      const getSerialNumber = getAllNfts.find(
        (item) => item[HEDERA_API_KEYS.token_id] === tokenId
      )?.[HEDERA_API_KEYS.serial_number];

      return getSerialNumber;
    });
};

export const getAllNftsFromAccountWithTokenId = (accountId, tokenId, returnOnlyCount = false) => {
  if (!accountId) return;

  return hederaApi
    .get(`/api/v1/accounts/${accountId}/nfts?token.id=${tokenId}&limit=100`)
    .then((res) => {
      const getAllNfts = res.data?.nfts ?? [];

      return returnOnlyCount ? getAllNfts.length : getAllNfts;
    });
};

export const getUsePassesByAccountId = async (accountId) => {
  if (!accountId) return;

  const token = await getAuthToken(accountId);

  if (token)
    return axios
      .get(
        `/hederaService/getUsePassesByUserId/${accountId}?${AUTHORIZATION}=${token}&accountId=${accountId}`
      )
      .then((res) => res.data);
};

export const getBuyPassesByAccountId = async (accountId) => {
  if (!accountId) return;

  const token = await getAuthToken(accountId);

  if (token)
    return axios
      .get(
        `/hederaService/getBuyPassesByAccountId/${accountId}?${AUTHORIZATION}=${token}&accountId=${accountId}`
      )
      .then((res) => res.data);
};

export const getLeaderBoardData = async (passType = '') => {
  return axios.get(`/public/getLeaderBoardByPassType?passType=${passType}`).then((res) => res.data);
};

export const submitUserEmail = (email, accountId) => {
  return axios
    .post(`/public/insertUserEmail`, {
      email,
      accountId
    })
    .then((res) => res.data);
};

export const submitUserTermsAccepted = (accountId, isTermsAccepted) => {
  return axios
    .post(`/public/insertUserTermsAndCondition`, {
      accountId,
      isTermsAccepted
    })
    .then((res) => res.data);
};

export const generateJwtToken = (data) => {
  return axios.post(`/public/generateJwtToken`, data).then((res) => res.data);
};

export const getLeaderBoardByAccountId = async (accountId) => {
  if (!accountId) return;

  const token = await getAuthToken(accountId);
  if (token)
    return axios
      .get(
        `/hederaService/getLeaderBoardByAccountId/${accountId}?${AUTHORIZATION}=${token}&accountId=${accountId}`
      )
      .then((res) => {
        return res.data;
      });
};

export const getAccountBalances = async (accountId) => {
  if (!accountId) return;

  const token = await getAuthToken(accountId);
  if (token)
    return axios
      .post(`/hederaService/getAccountBalances?${AUTHORIZATION}=${token}&accountId=${accountId}`, {
        accountId
      })
      .then((res) => res.data);
};

export const transferPrizeToUserAccount = async (
  winningAmount,
  accountId,
  passType,
  nftTransferTxnId,
  nftSerialNumber,
  nftTokenId,
  numSkillerTokenRewards
) => {
  // !winningAmount for value=0 will execute if statement, so don't use it
  if (!accountId || !passType || !nftTransferTxnId || !nftSerialNumber || !nftTokenId) {
    console.log(
      'transferPrizeToUserAccount API return executed',
      !accountId,
      !passType,
      !nftTransferTxnId,
      !nftSerialNumber,
      !nftTokenId
    );
    return;
  }

  const payload = {
    [HCS_KEYS.token_id]: nftTokenId,
    [HCS_KEYS.pass_type]: passType,
    [HCS_KEYS.nft_transfer_txn_id]: nftTransferTxnId,
    [HCS_KEYS.pass_serial_number]: nftSerialNumber
  };

  const token = await getAuthToken(accountId);
  if (token)
    return axios
      .post(
        `/hederaService/transferPrizeToUserAccount?${AUTHORIZATION}=${token}&accountId=${accountId}`,
        {
          accountId,
          winningAmount,
          numSkillerTokenRewards,
          ...payload
        }
      )
      .then((res) => res.data);
};

export const createNewTopic = async (accountId) => {
  const token = await getAuthToken(accountId);
  if (token)
    return axios
      .get(`/hederaService/createNewTopic?${AUTHORIZATION}=${token}&accountId=${accountId}`)
      .then((res) => res.data);
};
