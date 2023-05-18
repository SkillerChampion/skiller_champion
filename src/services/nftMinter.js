console.clear();
require('dotenv').config();

const {
  AccountId,
  PrivateKey,
  Client,
  TokenCreateTransaction,
  TokenInfoQuery,
  TokenType,
  CustomRoyaltyFee,
  CustomFixedFee,
  Hbar,
  TokenSupplyType,
  TokenMintTransaction,
  TokenBurnTransaction,
  TransferTransaction,
  AccountBalanceQuery,
  AccountUpdateTransaction,
  TokenAssociateTransaction,
} = require('@hashgraph/sdk');

const { getTreasuryAccountId, getTreasuryPrivateKey, getHederaClient } = require('../utils/helperFunctions');
// Configure accounts and client, and generate needed keys

const supplyKey = PrivateKey.generate();
const adminKey = PrivateKey.generate();

const mintWheelPasses = async () => {
  const client = await getHederaClient();
  const treasuryId = AccountId.fromString(getTreasuryAccountId());
  const treasuryKey = PrivateKey.fromString(await getTreasuryPrivateKey());

  // IPFS CONTENT IDENTIFIERS FOR WHICH WE WILL CREATE NFTs
  const META_DATA = [
    {
      CID: 'ipfs://QmTWDK48RKxo3c6yfqbVwuCPeARFaZMkn8gPFCgQtQPt9t',
      SYMBOL: 'Platinum Pass',
    },
    {
      CID: 'ipfs://QmWfSdX5dJFHuAtNk8d3w677ftqj77djxewNt98bmgXosL',
      SYMBOL: 'Gold Pass',
    },
    {
      CID: 'ipfs://QmPgF9T5u4Ziuk7EqcmHgzptWKiG1fu4QjGYxhvyccmQ6S',
      SYMBOL: 'Silver Pass',
    },
  ];

  // Token creation
  for (var i = 0; i < META_DATA.length; i++) {
    const item = META_DATA[i];
    try {
      let nftCreate = await new TokenCreateTransaction()
        .setTokenName('Skiller Champion')
        .setTokenSymbol(item.SYMBOL)
        .setTokenType(TokenType.NonFungibleUnique)
        .setDecimals(0)
        .setInitialSupply(0)
        .setTreasuryAccountId(treasuryId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(10000)
        .setAdminKey(adminKey)
        .setSupplyKey(supplyKey)
        .freezeWith(client)
        .sign(treasuryKey);

      let nftCreateTxSign = await nftCreate.sign(adminKey);
      let nftCreateSubmit = await nftCreateTxSign.execute(client);
      let nftCreateRx = await nftCreateSubmit.getReceipt(client);
      let tokenId = nftCreateRx.tokenId;
      console.log(`Created ${item.SYMBOL} NFT with Token ID: ${tokenId} \n`);

      const nftLeaf = await tokenMinterFcn(item.CID, tokenId, client);
      console.log(`Minted ${item.SYMBOL} NFT - ${tokenId} with serial - `);
    } catch (error) {
      console.log('Caught2222', error);
      throw error;
    }
  }
};

const tokenMinterFcn = async (CID, tokenId, client) => {
  const mintTx = await new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata([Buffer.from(CID)])
    // .setAmount(1)
    .freezeWith(client);

  let mintTxSign = await mintTx.sign(supplyKey);
  let mintTxSubmit = await mintTxSign.execute(client);
  let mintRx = await mintTxSubmit.getReceipt(client);
  return mintRx;
};

module.exports = { mintWheelPasses };
