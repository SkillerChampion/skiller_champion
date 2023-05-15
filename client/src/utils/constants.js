export const ZERO = 0;
export const TWO_SECONDS = 2000;
export const THREE_SECONDS = 3000;
export const FOUR_SECONDS = 4000;

export const FIVE_SECONDS = 5000;
export const SIX_SECONDS = 6000;
export const TEN_SECONDS = 10000;
export const TWELVE_SECONDS = 12000;
export const FIFTEEN_SECONDS = 15000;
export const TWENTY_SECONDS = 20000;
export const PLATFORM_FEES = 0;
export const DOT = '.';
export const GITHUB_OPEN_SOURCE_LINK =
  'https://github.com/SkillerChampion/skiller_champ_open_source';

export const GITHUB_OPEN_SOURCE_LINK_ROUTER =
  'https://github.com/SkillerChampion/skiller_champ_open_source/blob/3310ce9ee49c44a770cdd6bf01a07bb54b1d85c7/src/routes/fortuneWheel.js#LL24C13-L24C13';

// HEADER REQUESTS
export const AUTHORIZATION = 'AUTHORIZATION';

export const SPACE = ' ';

export const ARRAY_KEYS = {
  LABEL: 'LABEL',
  VALUE: 'VALUE',
  COMPONENT: 'COMPONENT',
  IS_WIN: 'IS_WIN',
  DATA: 'DATA',
  ANGLE: 'ANGLE',
  ON_CLICK: 'ON_CLICK',
  DESCRIPTION: 'DESCRIPTION',
  IS_TOKEN_ASSOCIATED: 'IS_TOKEN_ASSOCIATED',
  ASSOCIATE_TOKEN_ID: 'ASSOCIATE_TOKEN_ID',
  PASS_COUNT: 'PASS_COUNT',
  MAX_WINNER_AMOUNT: 'MAX_WINNER_AMOUNT',
  HEADER: 'HEADER',
  BODY: 'BODY',
  DISPLAY_FN: 'DISPLAY_FN',
  MIN_WIDTH: 'MIN_WIDTH'
};

export const FORTUNE_WHEEL = { BASE_ROTATION_ANGLE: 7200 };
export const CSS_VARIABLES = {
  WHEEL_BASE_ROTATION: '--fullRotationDeg'
};

export const HASH_CONNECT_KEYS = {
  TOPIC: 'topic',
  PAIRING_STRING: 'pairingString',
  SAVED_PAIRING_DATA: 'savedPairings',
  PAIRING_DATA: 'pairingData',
  ACCOUNT_IDS: 'accountIds',
  ACCOUNT_ID: 'accountId',
  NAME: 'name',
  DESCRIPTION: 'description',
  SIGNER: 'signer',
  WALLET_NAME: 'HashPack',
  PROVIDER: 'provider'
};

export const HASH_CONNECT_META_DATA = {
  [HASH_CONNECT_KEYS.NAME]: 'Skiller Champion',
  [HASH_CONNECT_KEYS.DESCRIPTION]: 'Play to Earn Game on Hedera'
};

export const hashConnectInitialData = {
  [HASH_CONNECT_KEYS.TOPIC]: '',
  [HASH_CONNECT_KEYS.ACCOUNT_IDS]: '',
  [HASH_CONNECT_KEYS.PAIRING_STRING]: '',
  [HASH_CONNECT_KEYS.SAVED_PAIRING_DATA]: null,
  [HASH_CONNECT_KEYS.SIGNER]: null
};

export const LOCAL_STORAGE_KEYS = {
  HASH_CONNECT_WALLET_DATA: 'hashconnectData'
};

export const HEDERA_API_KEYS = {
  tokens: 'tokens',
  token_id: 'token_id',
  serial_number: 'serial_number',
  nfts: 'nfts',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

export const PASSES_TYPES = {
  PLATINUM: 'PLATINUM',
  SILVER: 'SILVER',
  GOLD: 'GOLD'
};

export const WHEEL_BET_AMOUNTS = {
  PLATINUM: 2000,
  GOLD: 500,
  SILVER: 100
};

export const WHEEL_MAX_WINNER_AMOUNTS = {
  PLATINUM: 5000,
  GOLD: 1500,
  SILVER: 300
};

export const LEADER_BOARD_TABS = {
  ALL: 'ALL',
  PLATINUM: PASSES_TYPES.PLATINUM,
  GOLD: PASSES_TYPES.GOLD,
  SILVER: PASSES_TYPES.SILVER
};

export const HCS_KEYS = {
  type: 'type',
  pass_type: 'pass_type',
  pass_amount: 'pass_amount',
  status: 'status',
  winner_amount: 'winner_amount',
  pass_serial_number: 'pass_serial_number',
  token_id: 'token_id',
  user_account_id: 'user_account_id',
  error_msg: 'error_msg',
  txn_id: 'txn_id',
  nft_transfer_txn_id: 'nft_transfer_txn_id',
  consensus_timestamp: 'consensus_timestamp',
  message: 'message',
  messages: 'messages',
  payer_account_id: 'payer_account_id',
  time: 'time'
};

export const HCS_TYPES = {
  BUY_PASSES: 'BUY_PASSES',
  USE_PASSES: 'USE_PASSES'
};
