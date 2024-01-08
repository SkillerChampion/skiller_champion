require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const env = process.env.NODE_ENV;
console.log(`Node environment set to - ${env}`);

module.exports = Object.freeze({
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD_KEY,
  database: process.env.DATABASE,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  hederaApi: process.env.HEDERA_NODE_API,
  treasuryAccountId: process.env.TREASURY_ACCOUNT_ID,
  treasuryPrivateKey: process.env.TREASURY_PRIVATE_KEY,
  apiAccessKey: process.env.API_ACCESS_KEY,
  encryptionKey: process.env.ENCRYPTION_KEY,
  runTestNet: process.env.RUN_TESTNET,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  NODE_MAILER_USER: process.env.NODE_MAILER_USER,
  NODE_MAILER_PASS: process.env.NODE_MAILER_PASS,
  NODE_MAILER_RECIPIENT: process.env.NODE_MAILER_RECIPIENT,
  skillerTokenId: process.env.SKILLER_TOKEN_ID,
});
