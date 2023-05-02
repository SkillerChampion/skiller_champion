require('dotenv').config();
const moment = require('moment');

const { HCS_KEYS, ZERO_INDEX, DOT } = require('./constants');

const getTreasuryAccountId = () => process.env.TREASURY_ACCOUNT_ID;
const getTreasuryPrivateKey = () => process.env.TREASURY_PRIVATE_KEY;

const getFortuneWheelTopicId = () => process.env.TOPIC_ID_FORTUNE_WHEEL;

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
  const splitTimeToGetSeconds = time?.split(DOT)?.[ZERO_INDEX];
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

module.exports = {
  getTreasuryAccountId,
  getTreasuryPrivateKey,
  getFortuneWheelTopicId,
  decodeAllMessagesWithUserId,
  decodeHcsTimeStamp,
  isEmptyArray,
  getSecretAccessName,
};
