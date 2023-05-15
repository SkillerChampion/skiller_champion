require('dotenv').config();
const { Client } = require('@hashgraph/sdk');
const { enc, AES } = require('crypto-js');

const secretManager = require('./secretManager');
const { HCS_KEYS, ZERO, DOT, NODE_ENVS, UNAUTHORIZED } = require('./constants');
const configurations = require('../../config');

const getDynamicEnv = async (key) => {
  if (configurations.NODE_ENV === NODE_ENVS.development) {
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

const isEmptyArray = (input = []) => {
  return Array.isArray(input) && input?.length > 0 ? false : true;
};

const decryptData = (text) => {
  const bytes = AES.decrypt(text, getEncryptionKey());
  const decrypted = bytes.toString(enc.Utf8);
  return decrypted;
};

const handleServerError = (err, res) => {
  if (err.message === UNAUTHORIZED) {
    res.status(401).json({ msg: 'Unauthorized' });
  } else res.status(500).send('Server Error');
};

module.exports = {
  getTreasuryAccountId,
  getTreasuryPrivateKey,
  isEmptyArray,
  getApiAccessKey,
  decryptData,
  getHederaClient,
  getDynamicEnv,
  handleServerError,
};
