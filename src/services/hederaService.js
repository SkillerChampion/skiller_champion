/* eslint-disable no-unused-vars */
import {
  AccountId,
  TransferTransaction,
  AccountBalanceQuery,
  TopicCreateTransaction,
  PrivateKey,
  Client,
  TopicMessageQuery,
  TopicMessageSubmitTransaction
} from '@hashgraph/sdk';

import { HEDERA_API_KEYS, HCS_KEYS } from '../utils/constants';

import {
  getTreasuryAccountId,
  getTreasuryPrivateKey,
  getFortuneWheelTopicId
} from '../utils/helperFunctions';
import { SPACE, ZERO, PLATFORM_FEES } from '../utils/constants';
import {
  NODE_BE_API as axios,
  HEDERA_NODE_API as hederaApi,
  HASHSCAN_API as hashScanApi
} from './axiosInstance';

export const submitHcsMessage = (topicId, message = {}, accountId, passType) => {
  return axios
    .post(`/hederaService/submitHcsMessage`, {
      topicId,
      message,
      accountId
    })
    .then((res) => res.data);
};

export const chargeUserAndTransferNft = (amountHbar, accountId, tokenId, nftSerialNumber) => {
  return axios
    .post(`/hederaService/buyPassForHbars`, {
      amountHbar,
      accountId,
      tokenId,
      nftSerialNumber
    })
    .then((res) => res.data);
};

export const transferNftToTreasury = (accountId, tokenId, nftSerialNumber) => {
  if (!accountId || !tokenId || !nftSerialNumber) return;

  return axios
    .post(`/hederaService/transferNftToTreasury`, {
      accountId,
      tokenId,
      nftSerialNumber
    })
    .then((res) => res.data);
};

export const associateTokens = (accountId, tokenId) => {
  return axios
    .post(`/hederaService/associateTokens`, { accountId, tokenId })
    .then((res) => res.data);
};

export const getTokenRelationships = (accountId) => {
  if (!accountId) return;

  return hederaApi.get(`/api/v1/accounts/${accountId}/tokens`).then((res) => res.data);
};

export const getNftsSerialNumberFromTreasury = (accountId, tokenId) => {
  if (!accountId) return;

  return hederaApi.get(`/api/v1/accounts/${accountId}/nfts`).then((res) => {
    const getAllNfts = res.data?.nfts ?? [];

    const getSerialNumber = getAllNfts.find((item) => item[HEDERA_API_KEYS.token_id] === tokenId)?.[
      HEDERA_API_KEYS.serial_number
    ];

    return getSerialNumber;
  });
};

export const getAllNftsFromAccountWithTokenId = (accountId, tokenId, returnOnlyCount = false) => {
  if (!accountId) return;

  return hederaApi.get(`/api/v1/accounts/${accountId}/nfts`).then((res) => {
    const getAllNfts = res.data?.nfts ?? [];

    const filterNfts =
      getAllNfts.filter((item) => item[HEDERA_API_KEYS.token_id] === tokenId) ?? [];

    return returnOnlyCount ? filterNfts.length : filterNfts;
  });
};

export const getTopicMessagesByTopicId = async (topicId, accountId, passType) => {
  if (!topicId || !accountId) return;
  const order = 'desc';

  return axios
    .get(
      `/hederaService/getAllMessagesByTopicId/${topicId}/${accountId}?passType=${passType}&order=${order}`
    )
    .then((res) => res.data);
};

export const getUsePassesByAccountId = async (accountId) => {
  if (!accountId) return;
  const order = 'desc';

  return axios.get(`/hederaService/getUsePassesByUserId/${accountId}`).then((res) => res.data);
};

export const getBuyPassesByAccountId = async (accountId) => {
  if (!accountId) return;
  const order = 'desc';

  return axios.get(`/hederaService/getBuyPassesByAccountId/${accountId}`).then((res) => res.data);
};

export const getLeaderBoardData = async (passType = '') => {
  return axios
    .get(`/hederaService/getLeaderBoardByPassType?passType=${passType}`)
    .then((res) => res.data);
};

export const submitUserEmail = (email, accountId) => {
  return axios
    .post(`/hederaService/insertUserEmail`, {
      email,
      accountId
    })
    .then((res) => res.data);
};

export const getLeaderBoardByAccountId = (accountId) => {
  if (!accountId) return;
  return axios.get(`/hederaService/getLeaderBoardByAccountId/${accountId}`).then((res) => res.data);
};

export const getAccountBalances = async (accountId) => {
  if (!accountId) return;
  const client = getHederaClient();
  const balanceCheckTx = await new AccountBalanceQuery().setAccountId(accountId).execute(client);

  const hbarBalance = Number(balanceCheckTx?.hbars?.toString()?.split(SPACE)?.[ZERO]) ?? 0;

  return hbarBalance;
};

export const transferPrizeToUserAccount = async (winningAmount, accountId) => {
  // if (!winningAmount || winningAmount < 1) return;
  const client = getHederaClient();

  const computePlatformFees = (PLATFORM_FEES * winningAmount) / 100;
  const deductPlatformFees = winningAmount - computePlatformFees;

  const negativeAmount = -Math.abs(deductPlatformFees);
  const positiveAmount = Math.abs(deductPlatformFees);

  const sendHbar = await new TransferTransaction()
    .addHbarTransfer(AccountId.fromString(getTreasuryAccountId()), negativeAmount) //Sending account
    .addHbarTransfer(AccountId.fromString(accountId), positiveAmount) //Receiving account
    .execute(client);

  const transactionReceipt = await sendHbar.getReceipt(client);
  const txnRecord = await sendHbar.getRecord(client);

  const receiptStatus = transactionReceipt?.status?.toString();
  const txnId = txnRecord?.transactionId?.toString();

  console.log(
    'The transfer transaction from my treasury to the user account was: ' + receiptStatus,
    +' with txn id - ' + txnId
  );
  return { receiptStatus, txnId };
};

export const getHederaClient = () => {
  if (process.env.REACT_APP_RUN_TESTNET) {
    return Client.forTestnet().setOperator(getTreasuryAccountId(), getTreasuryPrivateKey());
  } else {
    return Client.forMainnet().setOperator(getTreasuryAccountId(), getTreasuryPrivateKey());
  }
};

// export const subscribeToTopicOnMainnet = () => {
//   const client = getHederaClient();
//   const topicId = getFortuneWheelTopicId();

//   new TopicMessageQuery().setTopicId(topicId).subscribe(client, null, (message) => {
//     let messageAsString = Buffer.from(message.contents, 'utf8').toString();
//     console.log(`${message.consensusTimestamp.toDate()} Received: ${messageAsString}`);
//   });
// };

// export const subscribeToTopic = async () => {
//   if (!process.env.REACT_APP_RUN_TESTNET) return subscribeToTopicOnMainnet();
// };

export const createNewTopic = async () => {
  const privateKey = getTreasuryPrivateKey();

  const client = getHederaClient();
  const txnId = await new TopicCreateTransaction()
    .setSubmitKey(privateKey.publicKey)
    .execute(client);

  const receipt = await txnId.getReceipt(client);

  const topicId = receipt.topicId?.toString();

  console.log('topicId', topicId);
  return topicId;
};
