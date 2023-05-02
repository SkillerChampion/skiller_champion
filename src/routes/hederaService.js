const {
  TransferTransaction,
  TokenAssociateTransaction,
  AccountId,
  TransactionId,
  PrivateKey,
} = require('@hashgraph/sdk');

const {
  getTreasuryPrivateKey,
  getTreasuryAccountId,
  decodeAllMessagesWithUserId,
} = require('../utils/helperFunctions');

const { check, validationResult } = require('express-validator');

const {
  getTopicMessagesByTopicId,
  submitHcsMessage,
  getUsePassesByUserId,
  getBuyPassesByAccountId,
  getLeaderBoardByPassType,
  insertUserEmail,
  getLeaderBoardByAccountId,
} = require('../services/hederaService');

const { HCS_KEYS } = require('../utils/constants');
const express = require('express');
const router = express.Router();

//@route POST api/buyPassForHbars
//desc - Charge Hbars for Passes
router.post(
  '/buyPassForHbars',
  [
    check('amountHbar', 'Hbar amount is required').not().isEmpty(),
    check('accountId', 'User account Id is required').not().isEmpty(),
    check('tokenId', 'Token Id is required').not().isEmpty(),
    check('nftSerialNumber', 'Serial Number is invalid').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { amountHbar, accountId, tokenId, nftSerialNumber } = req.body;

      const nodeId = [];
      nodeId.push(new AccountId(3));

      const transactionId = TransactionId.generate(accountId);

      const txn = new TransferTransaction()
        .addHbarTransfer(AccountId.fromString(getTreasuryAccountId()), Math.abs(amountHbar))
        .addHbarTransfer(AccountId.fromString(accountId), -Math.abs(amountHbar))
        .addNftTransfer(
          tokenId,
          nftSerialNumber,
          AccountId.fromString(getTreasuryAccountId()),
          AccountId.fromString(accountId)
        )
        .setNodeAccountIds(nodeId)
        .setTransactionId(transactionId)
        .freeze();

      const treasurySigned = await txn.sign(PrivateKey.fromString(getTreasuryPrivateKey()));
      const bytes = treasurySigned.toBytes();

      res.json(bytes);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route POST api/transferNftToTreasury
//desc - Transfer NFT to Treasury
router.post(
  '/transferNftToTreasury',
  [
    check('accountId', 'User account Id is required').not().isEmpty(),
    check('tokenId', 'Token Id is required').not().isEmpty(),
    check('nftSerialNumber', 'Serial Number is invalid').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { accountId, tokenId, nftSerialNumber } = req.body;

      const nodeId = [];
      nodeId.push(new AccountId(3));

      const transactionId = TransactionId.generate(accountId);

      const txn = new TransferTransaction()
        .addNftTransfer(
          tokenId,
          nftSerialNumber,
          AccountId.fromString(accountId),
          AccountId.fromString(getTreasuryAccountId())
        )
        .setNodeAccountIds(nodeId)
        .setTransactionId(transactionId)
        .freeze();

      const treasurySigned = await txn.sign(PrivateKey.fromString(getTreasuryPrivateKey()));
      const bytes = treasurySigned.toBytes();

      res.json(bytes);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route POST api/associateTokens
//desc - Associate tokenId to accountId
router.post(
  '/associateTokens',
  [
    check('tokenId', 'Token id is required').not().isEmpty(),
    check('accountId', 'User account Id is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { accountId, tokenId } = req.body;
      const nodeId = [];
      nodeId.push(new AccountId(3));

      const transactionId = TransactionId.generate(accountId);

      const txn = await new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([tokenId])
        .setNodeAccountIds(nodeId)
        .setTransactionId(transactionId)
        .freeze();

      const treasurySigned = await txn.sign(PrivateKey.fromString(getTreasuryPrivateKey()));
      const bytes = treasurySigned.toBytes();

      res.json(bytes);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/getAllMessagesByTopicId
//desc - Get consensus messages by topic id
router.get('/getAllMessagesByTopicId/:topicId/:accountId', async (req, res) => {
  const order = req.query.order;
  const passType = req.query.passType;
  const topicId = req.params.topicId;
  const accountId = req.params.accountId;

  try {
    const topicData = await getTopicMessagesByTopicId(topicId, order);
    const decodedMsgs = decodeAllMessagesWithUserId(topicData, passType, accountId);

    res.json(decodedMsgs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/submitHcsMessage
//desc - Post consensus messages
router.post(
  '/submitHcsMessage',
  [
    check('topicId', 'Topic id is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty(),
    check('accountId', 'Account Id is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { topicId, message, accountId } = req.body;

    try {
      const topicData = await submitHcsMessage(topicId, message, accountId);

      res.json(topicData);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/getUsePassesByUserId
//desc - Get use passes by account id
router.get('/getUsePassesByUserId/:accountId', async (req, res) => {
  const accountId = req.params.accountId;

  try {
    const params = { account_id: accountId };

    const usePasses = await getUsePassesByUserId(params);
    console.log('usePasses', usePasses);
    res.json(usePasses);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/getBuyPassesByAccountId
//desc - Get use passes by account id
router.get('/getBuyPassesByAccountId/:accountId', async (req, res) => {
  const accountId = req.params.accountId;

  try {
    const params = { account_id: accountId };

    const buyPasses = await getBuyPassesByAccountId(params);
    res.json(buyPasses);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/getLeaderBoardByPassType
//desc - Get Leader board by pass type
router.get('/getLeaderBoardByPassType', async (req, res) => {
  const passType = req.query.passType;

  try {
    const params = { pass_type: passType };
    const leaderBoard = await getLeaderBoardByPassType(params);
    res.json(leaderBoard);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/insertUserEmail
//desc - Post user email
router.post(
  '/insertUserEmail',
  [check('email', 'Valid email is required').isEmail().not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { accountId = '', email } = req.body;

      const params = { [HCS_KEYS.user_account_id]: accountId, [HCS_KEYS.email]: email };
      await insertUserEmail(params);

      res.send('Success');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/getBuyPassesByAccountId
//desc - Get use passes by account id
router.get('/getLeaderBoardByAccountId/:accountId', async (req, res) => {
  const accountId = req.params.accountId;

  try {
    const params = { account_id: accountId };

    const leaderBoard = await getLeaderBoardByAccountId(params);
    res.json(leaderBoard);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
