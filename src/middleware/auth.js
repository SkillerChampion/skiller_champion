const jwt = require('jsonwebtoken');
const { HASH_CONNECT_KEYS, X_ACCOUNT_ID, AUTHORIZATION, FIVE_SECONDS_SHORT } = require('../utils/constants');
const { getApiAccessKey } = require('../utils/helperFunctions');

const generateJwtToken = async (data) => {
  const payload = {
    [HASH_CONNECT_KEYS.ACCOUNT_ID]: data[HASH_CONNECT_KEYS.ACCOUNT_ID],
  };

  const getToken = await jwt.sign(payload, getApiAccessKey(), { expiresIn: FIVE_SECONDS_SHORT });

  console.log('jwtTokenjwtToken11111', getToken);

  if (getToken) return getToken;
};

const validateToken = async (req, res, next) => {
  //Get token from header
  const token = req.header(AUTHORIZATION);
  const userAccountId = req.header(X_ACCOUNT_ID);

  if (!token || !userAccountId) return res.status(401).json({ msg: 'Unauthorized' });

  try {
    const decoded = await jwt.verify(token, getApiAccessKey());

    if (decoded[HASH_CONNECT_KEYS.ACCOUNT_ID] === userAccountId) {
      console.log('Auth Token verification successful - ', decoded);

      next();
    }
  } catch (err) {
    console.log('Token decode failed: ', err);

    // res.status(401).json({ msg: 'Invalid Token' });
  }
};

module.exports = {
  validateToken,
  generateJwtToken,
};
