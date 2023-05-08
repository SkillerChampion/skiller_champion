const { check, validationResult } = require('express-validator');

const { getLeaderBoardByPassType, insertUserEmail } = require('../services/hederaService');

const { HCS_KEYS } = require('../utils/constants');
const express = require('express');
const { generateJwtToken } = require('../middleware/auth');
const router = express.Router();

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

//@route POST api/generateJwtToken
//desc - POST jwt token
router.post(
  '/generateJwtToken',
  [check('accountId', 'Account Id is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { accountId } = req.body;

    try {
      const jwtToken = await generateJwtToken({ accountId });
      res.json({ token: jwtToken });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
