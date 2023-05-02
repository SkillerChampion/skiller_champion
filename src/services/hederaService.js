const { HEDERA_NODE_API } = require('./axiosInstance');
const {
  TopicCreateTransaction,
  Client,
  TopicMessageQuery,
  TopicMessageSubmitTransaction,
} = require('@hashgraph/sdk');

const { HCS_KEYS, QUERIES, MAPPER_NAMESPACES, ARRAY_KEYS, HCS_TYPES } = require('../utils/constants');

const {
  getTreasuryAccountId,
  getTreasuryPrivateKey,
  decodeHcsTimeStamp,
  isEmptyArray,
} = require('../utils/helperFunctions');

const { executeQuery } = require('../utils/database/database');

const getHederaClient = () => {
  if (process.env.RUN_TESTNET) {
    return Client.forTestnet().setOperator(getTreasuryAccountId(), getTreasuryPrivateKey());
  } else {
    return Client.forMainnet().setOperator(getTreasuryAccountId(), getTreasuryPrivateKey());
  }
};

const getTopicMessagesByTopicId = async (topicId, order = 'desc') => {
  const limit = 1000000000000000000;

  return HEDERA_NODE_API.get(`/api/v1/topics/${topicId}/messages?order=${order}&limit=${limit}`).then(
    (res) => res.data
  );
};

const insertBuyPassTable = async (params) => {
  await executeQuery(MAPPER_NAMESPACES.buyOrUsePasses, QUERIES.insertBuyPass, params);
};

const insertUsePassTable = async (params) => {
  await executeQuery(MAPPER_NAMESPACES.buyOrUsePasses, QUERIES.insertUsePass, params);
};

const getUsePassesByUserId = async (params) => {
  const result = await executeQuery(MAPPER_NAMESPACES.buyOrUsePasses, QUERIES.selectUsePassByUserId, params);

  const data = result?.rows;

  if (!isEmptyArray(data)) {
    return data;
  } else return [];
};

const getBuyPassesByAccountId = async (params) => {
  const result = await executeQuery(MAPPER_NAMESPACES.buyOrUsePasses, QUERIES.selectBuyPassByUserId, params);

  const data = result?.rows;

  if (!isEmptyArray(data)) {
    return data;
  } else return [];
};

const getLeaderBoardByPassType = async (params) => {
  const result = await executeQuery(MAPPER_NAMESPACES.buyOrUsePasses, QUERIES.selectLeaderBoardUsePass, params);

  const data = result?.rows;

  if (!isEmptyArray(data)) {
    return data;
  } else return [];
};

const getLeaderBoardByAccountId = async (params) => {
  const result = await executeQuery(
    MAPPER_NAMESPACES.buyOrUsePasses,
    QUERIES.selectLeaderBoardUsePassByAccountId,
    params
  );

  const data = result?.rows;

  if (!isEmptyArray(data)) {
    return data;
  } else return [];
};

const insertUserEmail = async (params) => {
  await executeQuery(MAPPER_NAMESPACES.userInformation, QUERIES.insertUserEmail, params);
};

const findAndCallQueryFnByPassType = async (passType, params) => {
  const dataSet = [
    { [ARRAY_KEYS.VALUE]: HCS_TYPES.BUY_PASSES, [ARRAY_KEYS.FUNCTION]: insertBuyPassTable },
    { [ARRAY_KEYS.VALUE]: HCS_TYPES.USE_PASSES, [ARRAY_KEYS.FUNCTION]: insertUsePassTable },
  ];

  const queryFn = dataSet?.find((item) => item[ARRAY_KEYS.VALUE] === passType)?.[ARRAY_KEYS.FUNCTION];

  try {
    if (queryFn) await queryFn(params);
  } catch (error) {
    console.log('Database query error - ', error);
  }
};

const submitHcsMessage = async (topicId, message = {}, userAccountId) => {
  const client = getHederaClient();
  const appendUserAccountId = { ...message, [HCS_KEYS.user_account_id]: userAccountId };

  const stringifyMessage = JSON.stringify(appendUserAccountId);

  let sendResponse = await new TopicMessageSubmitTransaction({
    topicId: topicId,
    message: stringifyMessage,
  }).execute(client);

  // Get the receipt of the transaction
  const getReceipt = await sendResponse.getReceipt(client);
  const txnRecord = await sendResponse.getRecord(client);

  // Get the status of the transaction
  const transactionStatus = getReceipt.status?.toString();

  // Get consensus timestamp
  const consensusTime = txnRecord?.consensusTimestamp?.toString();

  const queryData = {
    ...appendUserAccountId,
    [HCS_KEYS.consensus_timestamp]: consensusTime,
    [HCS_KEYS.payer_account_id]: getTreasuryAccountId(),
    [HCS_KEYS.modified_timestamp]: decodeHcsTimeStamp(consensusTime),
  };

  console.log(
    'The consensus message has been posted with ->  ' + transactionStatus + '  ->  with timestamp  -> ',
    consensusTime,
    queryData
  );

  await findAndCallQueryFnByPassType(appendUserAccountId?.[HCS_KEYS.type], queryData);

  return transactionStatus;
};

module.exports = {
  getTopicMessagesByTopicId,
  submitHcsMessage,
  getUsePassesByUserId,
  getBuyPassesByAccountId,
  getLeaderBoardByPassType,
  insertUserEmail,
  getLeaderBoardByAccountId,
  getHederaClient,
};
