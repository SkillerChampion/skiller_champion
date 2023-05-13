const jwt = require('jsonwebtoken');
const { HASH_CONNECT_KEYS, TOKEN_EXPIRY_TIME, AUTHORIZATION, USER_AGENT } = require('../utils/constants');
const { getApiAccessKey, decryptData } = require('../utils/helperFunctions');
const { sendEmailToAdmin } = require('../utils/nodeMailer');

const generateJwtToken = async (data) => {
  try {
    const payload = {
      [HASH_CONNECT_KEYS.ACCOUNT_ID]: data?.[HASH_CONNECT_KEYS.ACCOUNT_ID],
    };

    const token = await jwt.sign(payload, getApiAccessKey(), { expiresIn: TOKEN_EXPIRY_TIME });

    if (token) return token;
  } catch (error) {
    console.log('Token generation failed: ', error);
  }
};

const validateToken = async (req, res, next) => {
  const allowedUserAgents = ['Chrome', 'Safari', 'Firefox', 'Edg'];

  try {
    const getUserAgent = req.headers[USER_AGENT];
    const isAgentAllowed = allowedUserAgents.some((agent) => getUserAgent.includes(agent));

    if (!isAgentAllowed) {
      const title = `Middleware auth - User Agent - ${getUserAgent} is not allowed`;

      console.log(title);
      sendEmailToAdmin(title);
      throw Error;
    }

    //Get token from header
    const allSpacesRegex = / /g;

    const token = req.query[AUTHORIZATION]?.replace(allSpacesRegex, '+');
    const accountId = req.query.accountId;

    const decrypt = decryptData(token);

    if (!token || !accountId || !decrypt) {
      throw Error;
    }

    const decoded = await jwt.verify(decrypt, getApiAccessKey());

    if (decoded[HASH_CONNECT_KEYS.ACCOUNT_ID] === accountId) {
      console.log('Auth Token verification successful - ', decoded);

      next();
    }
  } catch (err) {
    const title = 'JWT token decode failed - ' + err.toString();
    sendEmailToAdmin(title);

    res.status(401).json({ msg: 'Unauthorized' });
  }
};

module.exports = {
  validateToken,
  generateJwtToken,
};
