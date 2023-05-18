const configurations = require('../../config');

const DOT = '.';
const SPACE = ' ';
const ZERO = 0;
const PLATFORM_FEES = ZERO;
const AUTHORIZATION = 'AUTHORIZATION';
const UNAUTHORIZED = 'UNAUTHORIZED';
const USER_AGENT = 'user-agent';

const ARRAY_KEYS = {
  LABEL: 'LABEL',
  VALUE: 'VALUE',
  COMPONENT: 'COMPONENT',
  DATA: 'DATA',
  ANGLE: 'ANGLE',
  IS_WIN: 'IS_WIN',
  FUNCTION: 'FUNCTION',
  VALIDATION: 'VALIDATION',
};

const HASH_CONNECT_KEYS = {
  TOPIC: 'topic',
  PAIRING_STRING: 'pairingString',
  PRIVATE_KEY: 'privateKey',
  ACCOUNT_ID: 'accountId',
  PAIRING_DATA: 'pairingData',
  NAME: 'name',
  DESCRIPTION: 'description',
  TOKEN: 'token',
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
  email: 'email',
  txn_id: 'txn_id',
};

const NODE_ENVS = {
  development: 'development',
  production: 'production',
  testing: 'testing',
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
  selectUsePassByTxnId: 'selectUsePassByTxnId',
  checkIfUsePassTxnWithTrueRedemptionExists: 'checkIfUsePassTxnWithTrueRedemptionExists',
  markUsePassRedeemed: 'markUsePassRedeemed',
};

const HCS_TYPES = {
  BUY_PASSES: 'BUY_PASSES',
  USE_PASSES: 'USE_PASSES',
};

const DEPLOYED_ORIGIN_URL = [
  'https://skiller-champion.uc.r.appspot.com',
  'https://testing-fe-dot-skiller-champion.uc.r.appspot.com',
];

const GCP_PROJECT_ID = 948181003317;
const TOKEN_EXPIRY_TIME = configurations.NODE_ENV === NODE_ENVS.development ? '20m' : '10s';

module.exports = {
  ARRAY_KEYS,
  HASH_CONNECT_KEYS,
  ZERO,
  DOT,
  HCS_KEYS,
  NODE_ENVS,
  MAPPER_NAMESPACES,
  QUERIES,
  HCS_TYPES,
  DEPLOYED_ORIGIN_URL,
  GCP_PROJECT_ID,
  TOKEN_EXPIRY_TIME,
  SPACE,
  AUTHORIZATION,
  PLATFORM_FEES,
  UNAUTHORIZED,
  USER_AGENT,
};
