const { HEDERA_NODE_API } = require('./axiosInstance');
const {
  TopicCreateTransaction,
  Client,
  TopicMessageQuery,
  TopicMessageSubmitTransaction,
  PrivateKey,
} = require('@hashgraph/sdk');

const {
  HCS_KEYS,
  QUERIES,
  MAPPER_NAMESPACES,
  ARRAY_KEYS,
  HCS_TYPES,
  ZERO,
  UNAUTHORIZED,
} = require('../utils/constants');
const { sendEmailToAdmin } = require('../utils/nodeMailer');

const {
  getTreasuryAccountId,
  isEmptyArray,
  getHederaClient,
  getTreasuryPrivateKey,
} = require('../utils/helperFunctions');

const { executeQuery } = require('../utils/database/database');

const checkIfUsePassTxnExists = async (params) => {
  const result = await executeQuery(MAPPER_NAMESPACES.buyOrUsePasses, QUERIES.selectUsePassByTxnId, params);

  const count = result?.rows?.[ZERO]?.count;

  if (count == ZERO) {
    // ONLY USE == as count is string
    return false;
  } else return true;
};

const checkIfUsePassTxnWithTrueRedemptionExists = async (params) => {
  const result = await executeQuery(
    MAPPER_NAMESPACES.buyOrUsePasses,
    QUERIES.checkIfUsePassTxnWithTrueRedemptionExists,
    params
  );

  const count = result?.rows?.[ZERO]?.count;

  if (count == ZERO) {
    // ONLY USE == as count is string
    return false;
  } else return true;
};

const markUsePassRedeemed = async (params) => {
  await executeQuery(MAPPER_NAMESPACES.buyOrUsePasses, QUERIES.markUsePassRedeemed, params);
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

const findAndCallQueryFnByPassType = async (params = {}, res) => {
  const dataSet = [
    {
      [ARRAY_KEYS.VALUE]: HCS_TYPES.BUY_PASSES,
      [ARRAY_KEYS.FUNCTION]: insertBuyPassTable,
      [ARRAY_KEYS.VALIDATION]: checkIfUsePassTxnExists,
    },
    {
      [ARRAY_KEYS.VALUE]: HCS_TYPES.USE_PASSES,
      [ARRAY_KEYS.FUNCTION]: insertUsePassTable,
    },
  ];

  try {
    const filterFnType = dataSet?.find((item) => item[ARRAY_KEYS.VALUE] === params[HCS_KEYS.type]);
    const queryFn = filterFnType?.[ARRAY_KEYS.FUNCTION];

    // Only call validation for buy pass insertion
    // The validation for use pass happens inside /transferPrizeToUserAccount api
    const doesTxnAlreadyExists = await filterFnType?.[ARRAY_KEYS.VALIDATION]?.(params);

    if (doesTxnAlreadyExists) {
      const title = `Duplicate buy pass insertion with txn id - ${
        params[HCS_KEYS.txn_id]
      } detected for user id - ${params[HCS_KEYS.user_account_id]}`;

      sendEmailToAdmin(title);

      throw Error(UNAUTHORIZED);
    }

    if (queryFn && !doesTxnAlreadyExists) return queryFn;
  } catch (error) {
    console.log('Database query error - ', error);
    throw error;
  }
};

const submitHcsMessage = async (topicId, message = {}, userAccountId, res) => {
  const client = await getHederaClient();
  const appendUserAccountId = { ...message, [HCS_KEYS.user_account_id]: userAccountId };

  const stringifyMessage = JSON.stringify(appendUserAccountId);

  const queryFn = await findAndCallQueryFnByPassType(appendUserAccountId, res);

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
  };

  console.log(
    'The consensus message has been posted with ->  ' + transactionStatus + '  ->  with timestamp  -> ',
    consensusTime,
    queryData
  );

  await queryFn(queryData);

  return transactionStatus;
};

const createNewTopic = async () => {
  const privateKey = await getTreasuryPrivateKey();
  const client = await getHederaClient();

  // const txnId = await new TopicCreateTransaction().setSubmitKey(PrivateKey.fromString(privateKey)).execute(client);
  console.log('client 11- ', client);

  const txnId = await new TopicCreateTransaction().execute(client);
  console.log('txnId 11- ', txnId);

  const receipt = await txnId.getReceipt(client);
  console.log('receipt 11- ', receipt);
  console.log('receipt 222 - ', receipt.topicId);

  const topicId = receipt.topicId?.toString();

  const params = { topicId: topicId };
  await executeQuery(MAPPER_NAMESPACES.topics, QUERIES.insertNewTopic, params);

  console.log('Created new topic - ', topicId);

  const title = `New topic generated with topic id - ${topicId}`;
  sendEmailToAdmin(title);

  return topicId;
};

module.exports = {
  submitHcsMessage,
  getUsePassesByUserId,
  getBuyPassesByAccountId,
  getLeaderBoardByPassType,
  insertUserEmail,
  getLeaderBoardByAccountId,
  checkIfUsePassTxnWithTrueRedemptionExists,
  markUsePassRedeemed,
  createNewTopic,
};
