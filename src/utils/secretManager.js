const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient({ fallback: true });
const config = require('../../config');

const getSecret = async (secretName) => {
  try {
    if (!secretName) {
      throw new TypeError('secretName is required!');
    }
    if (typeof secretName !== 'string') {
      throw new TypeError('secretName must be a string!');
    }
    const [secret] = await client.accessSecretVersion({
      name: secretName
    });
    console.log(`Found Secret for key: ${secretName}`);
    return secret;
  } catch (error) {
    console.log(`SecretAccessError: ${error}`);
    throw error;
  }
};

const getSecretValue = async (secretName) => {
  try {
    const version = await getSecret(secretName);
    console.log(`Retriving secret ... ${secretName}`);

    const data = version.payload ? version.payload.data : '';
    return new TextDecoder('utf-8').decode(data);
  } catch (error) {
    console.log(`An Error Occurred: ${error}`);
  }
};

module.exports = {
  getSecret,
  getSecretValue
};
