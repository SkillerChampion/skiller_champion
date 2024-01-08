const {
  TransferTransaction,
  TokenAssociateTransaction,
  AccountId,
  TransactionId,
  PrivateKey,
  AccountBalanceQuery,
} = require('@hashgraph/sdk');

const {
  getTreasuryPrivateKey,
  getTreasuryAccountId,
  getHederaClient,
  handleServerError,
  getSkillerTokenId,
} = require('../utils/helperFunctions');

const { check, validationResult } = require('express-validator');

const {
  submitHcsMessage,
  getUsePassesByUserId,
  getBuyPassesByAccountId,
  getLeaderBoardByAccountId,
  checkIfUsePassTxnWithTrueRedemptionExists,
  markUsePassRedeemed,
  createNewTopic,
} = require('../services/hederaService');

const { sendEmailToAdmin } = require('../utils/nodeMailer');

const { SPACE, ZERO, PLATFORM_FEES, UNAUTHORIZED } = require('../utils/constants');
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

      const pvKey = await getTreasuryPrivateKey();

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
      const treasurySigned = await txn.sign(PrivateKey.fromString(pvKey));
      const bytes = treasurySigned.toBytes();

      res.json(bytes);
    } catch (err) {
      console.log('Error /buyPassForHbars - ', err.message);
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
      const pvKey = await getTreasuryPrivateKey();

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

      const treasurySigned = await txn.sign(PrivateKey.fromString(pvKey));
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
      const pvKey = await getTreasuryPrivateKey();

      const txn = await new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([tokenId])
        .setNodeAccountIds(nodeId)
        .setTransactionId(transactionId)
        .freeze();

      const treasurySigned = await txn.sign(PrivateKey.fromString(pvKey));
      const bytes = treasurySigned.toBytes();

      res.json(bytes);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

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
      const topicData = await submitHcsMessage(topicId, message, accountId, res);

      res.json(topicData);
    } catch (err) {
      console.log('/submitHcsMessage ERROR - ', err);
      handleServerError(err, res);
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

//@route GET api/getLeaderBoardByAccountId
//desc - Get Leader board by account id
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

//@route POST api/getAccountBalances
//desc - Post account balance by account id
router.post(
  '/getAccountBalances',
  [check('accountId', 'Account Id is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { accountId } = req.body;

    try {
      const client = await getHederaClient();
      const balanceCheckTx = await new AccountBalanceQuery().setAccountId(accountId).execute(client);

      const hbarBalance = Number(balanceCheckTx?.hbars?.toString()?.split(SPACE)?.[ZERO]) ?? 0;

      res.json(hbarBalance);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route POST api/transferPrizeToUserAccount
//desc - Post account balance by account id
router.post(
  '/transferPrizeToUserAccount',
  [
    check('accountId', 'Account Id is required').not().isEmpty(),
    check('winningAmount', 'Winning amount is required').not().isEmpty(),
    check('pass_type', 'pass_type is required').not().isEmpty(),
    check('nft_transfer_txn_id', 'nft_transfer_txn_id is required').not().isEmpty(),
    check('pass_serial_number', 'pass_serial_number is required').not().isEmpty(),
    check('token_id', 'token_id is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const params = req.body;

    if (params.winningAmount > 5000 || params.numSkillerTokenRewards > 6100) {
      const title = `TRANSFER PRIZE OF ${params.winningAmount} and Skiller tokens - ${params.numSkillerTokenRewards} is requested by account id - ${params.accountId} for amount - ${params.winningAmount} HBARS, MAX ALLOWED - 5000 HBARS. The NFT is ${params.pass_type} with token id -${params.token_id} and serial number - ${params.pass_serial_number}`;
      sendEmailToAdmin(title);

      return res.status(400).json({ errors: ['Invalid request'] });
    }

    try {
      const isRedeemAvailable = await checkIfUsePassTxnWithTrueRedemptionExists(params);

      if (isRedeemAvailable) {
        const client = await getHederaClient();
        const computePlatformFees = (PLATFORM_FEES * params.winningAmount) / 100;
        const deductPlatformFees = params.winningAmount - computePlatformFees;
        const negativeAmount = -Math.abs(deductPlatformFees);
        const positiveAmount = Math.abs(deductPlatformFees);

        const negativeSkillerAmount = -Math.abs(params.numSkillerTokenRewards);
        const positiveSkillerAmount = Math.abs(params.numSkillerTokenRewards);

        // Send Skiller rewards
        const sendSkiller = await new TransferTransaction()
          .addTokenTransfer(
            getSkillerTokenId(),
            AccountId.fromString(getTreasuryAccountId()),
            negativeSkillerAmount
          ) //Sending account
          .addTokenTransfer(getSkillerTokenId(), AccountId.fromString(params.accountId), positiveSkillerAmount) //Receiving account
          .execute(client);

        const skillerTransactionReceipt = await sendSkiller.getReceipt(client);
        const skillerTxnRecord = await sendSkiller.getRecord(client);

        const skillerReceiptStatus = skillerTransactionReceipt?.status?.toString();
        const skillerTxnId = skillerTxnRecord?.transactionId?.toString();

        console.log(
          `(1/2) The transfer transaction ${positiveSkillerAmount} of $SKILLER from treasury to the user account was: ` +
            skillerReceiptStatus,
          +' with txn id - ' + skillerTxnId
        );

        // Send Hbar rewards
        const sendHbar = await new TransferTransaction()
          .addHbarTransfer(AccountId.fromString(getTreasuryAccountId()), negativeAmount) //Sending account
          .addHbarTransfer(AccountId.fromString(params.accountId), positiveAmount) //Receiving account
          .execute(client);

        const transactionReceipt = await sendHbar.getReceipt(client);
        const txnRecord = await sendHbar.getRecord(client);

        const receiptStatus = transactionReceipt?.status?.toString();
        const txnId = txnRecord?.transactionId?.toString();

        console.log(
          `(2/2) The transfer transaction of ${positiveAmount} HBARS from treasury to the user account was: ` +
            receiptStatus,
          +' with txn id - ' + txnId
        );

        markUsePassRedeemed(params);

        res.json({ receiptStatus, txnId, skillerReceiptStatus, skillerTxnId });
      } else {
        const title = `/transferPrizeToUserAccount api called for redeeming token that is already redeemed by user account id - ${params.accountId} for amount - ${params.winningAmount} HBARS. The NFT is ${params.pass_type} with token id -${params.token_id} and serial number - ${params.pass_serial_number}`;
        sendEmailToAdmin(title);

        throw Error(UNAUTHORIZED);
      }
    } catch (err) {
      console.log('/transferPrizeToUserAccount Error - ', err.message);
      handleServerError(err, res);
    }
  }
);

//@route GET api/createNewTopic
//desc - Create new topic
router.get(
  '/createNewTopic',
  [
    check('accountId').custom((value) => {
      if (value === getTreasuryAccountId()) {
        return true;
      }
      throw new Error('Admin access required');
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const topicId = await createNewTopic();

      res.send(`New topic id generated - ${topicId}`);
    } catch (err) {
      console.log('/createNewTopic Error - ', err);

      handleServerError(err, res);
    }
  }
);

module.exports = router;
