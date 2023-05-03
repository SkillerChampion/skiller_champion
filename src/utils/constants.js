const DOT = '.';
const X_ACCOUNT_ID = 'X-ACCOUNT-ID';
const AUTHORIZATION = 'AUTHORIZATION';
const ZERO_INDEX = 0;
const FIVE_SECONDS_SHORT = '5s';

const ARRAY_KEYS = {
  LABEL: 'LABEL',
  VALUE: 'VALUE',
  COMPONENT: 'COMPONENT',
  DATA: 'DATA',
  ANGLE: 'ANGLE',
  IS_WIN: 'IS_WIN',
  FUNCTION: 'FUNCTION',
};

const HASH_CONNECT_KEYS = {
  TOPIC: 'topic',
  PAIRING_STRING: 'pairingString',
  PRIVATE_KEY: 'privateKey',
  ACCOUNT_ID: 'accountId',
  PAIRING_DATA: 'pairingData',
  NAME: 'name',
  DESCRIPTION: 'description',
};

const HCS_KEYS = {
  type: 'type',
  pass_type: 'pass_type',
  pass_amount: 'pass_amount',
  status: 'status',
  pass_serial_number: 'pass_serial_number',
  token_id: 'token_id',
  user_account_id: 'user_account_id',
  consensus_timestamp: 'consensus_timestamp',
  message: 'message',
  messages: 'messages',
  payer_account_id: 'payer_account_id',
  modified_timestamp: 'modified_timestamp',
  email: 'email',
};

const NODE_ENVS = {
  development: 'development',
  production: 'production',
  st: 'st',
};

const MAPPER_NAMESPACES = {
  buyOrUsePasses: 'buyOrUsePasses',
  userInformation: 'userInformation',
};

const QUERIES = {
  insertBuyPass: 'insertBuyPass',
  insertUsePass: 'insertUsePass',
  selectUsePassByUserId: 'selectUsePassByUserId',
  selectBuyPassByUserId: 'selectBuyPassByUserId',
  selectLeaderBoardUsePass: 'selectLeaderBoardUsePass',
  insertUserEmail: 'insertUserEmail',
  selectUserEmail: 'selectUserEmail',
  updateUserEmail: 'updateUserEmail',
  selectLeaderBoardUsePassByAccountId: 'selectLeaderBoardUsePassByAccountId',
};

const HCS_TYPES = {
  BUY_PASSES: 'BUY_PASSES',
  USE_PASSES: 'USE_PASSES',
};

const DEPLOYED_ORIGIN_URL = 'https://skiller-champion.uc.r.appspot.com';
const GCP_PROJECT_ID = 948181003317;

module.exports = {
  ARRAY_KEYS,
  HASH_CONNECT_KEYS,
  ZERO_INDEX,
  DOT,
  HCS_KEYS,
  NODE_ENVS,
  MAPPER_NAMESPACES,
  QUERIES,
  HCS_TYPES,
  DEPLOYED_ORIGIN_URL,
  X_ACCOUNT_ID,
  GCP_PROJECT_ID,
  AUTHORIZATION,
  FIVE_SECONDS_SHORT,
};
