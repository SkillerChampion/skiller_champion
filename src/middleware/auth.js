const jwt = require('jsonwebtoken');
const { HASH_CONNECT_KEYS, THREE_MINUTES, AUTHORIZATION } = require('../utils/constants');
const { getApiAccessKey, decryptData } = require('../utils/helperFunctions');

const generateJwtToken = async (data) => {
  try {
    const payload = {
      [HASH_CONNECT_KEYS.ACCOUNT_ID]: data?.[HASH_CONNECT_KEYS.ACCOUNT_ID],
    };

    const token = await jwt.sign(payload, getApiAccessKey(), { expiresIn: THREE_MINUTES });

    if (token) return token;
  } catch (error) {
    console.log('Token generation failed: ', error);
  }
};

const validateToken = async (req, res, next) => {
  try {
    //Get token from header
    const allSpacesRegex = / /g;

    const token = req.query[AUTHORIZATION]?.replace(allSpacesRegex, '+');
    const accountId = req.query.accountId;

    const decrypt = decryptData(token);

    if (!token || !accountId || !decrypt) return res.status(401).json({ msg: 'Unauthorized' });

    const decoded = await jwt.verify(decrypt, getApiAccessKey());

    if (decoded[HASH_CONNECT_KEYS.ACCOUNT_ID] === accountId) {
      console.log('Auth Token verification successful - ', decoded);

      next();
    }
  } catch (err) {
    console.log('Token decode failed: ', err);

    res.status(401).json({ msg: 'Unauthorized' });
  }
};

module.exports = {
  validateToken,
  generateJwtToken,
};
