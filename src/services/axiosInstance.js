const axios = require('axios');

const HEDERA_NODE_API = axios.create({
  baseURL: process.env.HEDERA_NODE_API
});

module.exports = {
  HEDERA_NODE_API
};
