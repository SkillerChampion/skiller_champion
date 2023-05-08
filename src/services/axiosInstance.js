const axios = require('axios');
const configurations = require('../../config');

const HEDERA_NODE_API = axios.create({
  baseURL: configurations.hederaApi,
});

module.exports = {
  HEDERA_NODE_API,
};
