require('dotenv').config();

const { AccountId, PrivateKey, TokenCreateTransaction, TokenType, TokenSupplyType } = require('@hashgraph/sdk');
const { ONE_TRILLION, ONE_AND_HALF_TRILLION, NODE_ENVS } = require('../utils/constants');
const { getTreasuryAccountId, getTreasuryPrivateKey, getHederaClient } = require('../utils/helperFunctions');
const configurations = require('../../config');

const createAndMintTokenOnTestNet = async (tokenName = '', tokenSymbol = '') => {
  if (configurations.NODE_ENV !== NODE_ENVS.development)
    throw Error('Minting testnet is only allowed on development env');

  const privateKey = await getTreasuryPrivateKey();
  const client = await getHederaClient();

  const treasuryId = AccountId.fromString(getTreasuryAccountId());
  const adminKey = PrivateKey.fromString(privateKey);

  //Create the transaction and optionally freeze for manual signing
  const txnId = await new TokenCreateTransaction()
    .setTokenName(tokenName)
    .setTokenSymbol(tokenSymbol)
    .setTokenType(TokenType.FungibleCommon)
    .setSupplyType(TokenSupplyType.Finite)
    .setTreasuryAccountId(treasuryId)
    .setInitialSupply(ONE_TRILLION)
    .setMaxSupply(ONE_AND_HALF_TRILLION)
    .setDecimals(0)
    .setAdminKey(adminKey);

  console.log('The new token ID is ' + txnId, privateKey);

  //Sign the transaction with the token adminKey and the token treasury account private key
  const signTx = await txnId.signWithOperator(client);

  //Sign the transaction with the client operator private key and submit to a Hedera network
  const txResponse = await signTx.execute(client);

  const receipt = await txResponse.getReceipt(client);

  return receipt.tokenId?.toString();
};

module.exports = { createAndMintTokenOnTestNet };
