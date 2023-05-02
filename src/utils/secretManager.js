const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { getSecretAccessName } = require('./helperFunctions');
const { GCP_PROJECT_ID } = require('./constants');

const client = new SecretManagerServiceClient({ fallback: true });

const getSecret = async (secretName) => {
  try {
    if (!secretName) {
      throw new Error('secretName is required!');
    }

    console.log(`Searching secret for key: ${secretName}`);

    const [secret] = await client.accessSecretVersion({
      name: secretName,
    });

    return secret;
  } catch (error) {
    console.log(`SecretAccessError: ${error}`);
    throw error;
  }
};

const getSecretValue = async (secretName) => {
  try {
    const getFullSecretName = getSecretAccessName(GCP_PROJECT_ID, secretName);
    const version = await getSecret(getFullSecretName);

    const data = version?.payload?.data ? version.payload.data.toString() : '';
    const decodedSecret = Buffer.from(data, 'base64').toString();

    console.log(`Found Secret for key: ${secretName}`);
    return decodedSecret;
  } catch (error) {
    console.log(`An Error Occurred while SecretAccessError: ${error}`);
  }
};

module.exports = {
  getSecretValue,
};
