require('dotenv').config();
const { Client } = require('@hashgraph/sdk');
const moment = require('moment');
const { enc, AES } = require('crypto-js');

const secretManager = require('./secretManager');
const { HCS_KEYS, ZERO, DOT, NODE_ENVS } = require('./constants');
const configurations = require('../../config');

const getDynamicEnv = async (key) => {
  if (configurations.NODE_ENV === NODE_ENVS.development || configurations.NODE_ENV === NODE_ENVS.st) {
    return key;
  } else {
    return await secretManager.getSecretValue(key);
  }
};

const getTreasuryPrivateKey = async () => await getDynamicEnv(configurations.treasuryPrivateKey);
const getTreasuryAccountId = () => configurations.treasuryAccountId;
const getApiAccessKey = () => configurations.apiAccessKey;
const getEncryptionKey = () => configurations.encryptionKey;

const getHederaClient = async () => {
  if (configurations.runTestNet) {
    return Client.forTestnet().setOperator(getTreasuryAccountId(), await getTreasuryPrivateKey());
  } else {
    return Client.forMainnet().setOperator(getTreasuryAccountId(), await getTreasuryPrivateKey());
  }
};

const b64_to_utf8 = (str) => {
  const decode = decodeURIComponent(atob(str));

  return decode;
};

const decodeHcsMsg = (msg) => {
  const convertBase64ToText = b64_to_utf8(msg);

  let text = convertBase64ToText;

  try {
    const parsedString = JSON.parse(convertBase64ToText);
    text = parsedString;
  } catch (error) {}

  return text;
};

const convertTimeToMomentFormat = (seconds) => {
  const unixTime = moment.unix(seconds)?.locale('en');
  const formattedTime = unixTime?.format('MMMM DD, YYYY - hh:mm A');
  return formattedTime;
};

const decodeHcsTimeStamp = (time) => {
  const splitTimeToGetSeconds = time?.split(DOT)?.[ZERO];
  return convertTimeToMomentFormat(splitTimeToGetSeconds);
};

const decodeAllMessagesWithUserId = (topicData = {}, passType, accountId) => {
  const getMessages = topicData[HCS_KEYS.messages] ?? [];

  const decodeMessages =
    getMessages
      .map((item) => {
        const payer_id = item[HCS_KEYS.payer_account_id];
        const message = item[HCS_KEYS.message];
        const timeStamp = item[HCS_KEYS.consensus_timestamp];

        const decodedMsg = message;
        const decodedTimeStamp = decodeHcsTimeStamp(timeStamp);

        return {
          [HCS_KEYS.payer_account_id]: payer_id,
          [HCS_KEYS.message]: decodeHcsMsg(decodedMsg),
          [HCS_KEYS.consensus_timestamp]: timeStamp,
          [HCS_KEYS.modified_timestamp]: decodedTimeStamp,
        };
      })
      ?.filter((item) => {
        if (
          passType === item[HCS_KEYS.message]?.[HCS_KEYS.type] &&
          accountId === item[HCS_KEYS.message]?.[HCS_KEYS.user_account_id]
        )
          return true;
      }) ?? [];

  return decodeMessages;
};

const isEmptyArray = (input = []) => {
  return Array.isArray(input) && input?.length > 0 ? false : true;
};

const getSecretAccessName = (projectId, secretName) => {
  return `projects/${projectId}/secrets/${secretName}/versions/latest`;
};

const decryptData = (text) => {
  const bytes = AES.decrypt(text, getEncryptionKey());
  const decrypted = bytes.toString(enc.Utf8);
  return decrypted;
};

module.exports = {
  getTreasuryAccountId,
  getTreasuryPrivateKey,
  decodeAllMessagesWithUserId,
  decodeHcsTimeStamp,
  isEmptyArray,
  getSecretAccessName,
  getApiAccessKey,
  decryptData,
  getHederaClient,
  getDynamicEnv,
};
