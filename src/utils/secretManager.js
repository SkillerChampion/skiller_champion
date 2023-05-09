const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient({ fallback: true });

const { GCP_PROJECT_ID } = require('./constants');

const getSecretAccessName = (projectId, secretName) => {
  return `projects/${projectId}/secrets/${secretName}/versions/latest`;
};

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

    const data = version?.payload?.data ? version.payload.data : '';
    const decodedSecret = Buffer.from(data, 'base64').toString('utf-8');

    console.log(`Found Secret for key: ${secretName}, ${version.payload.data.toString()}`);
    console.log(`Secret key value: ${decodedSecret}`);
    return decodedSecret;
  } catch (error) {
    console.log(`An Error Occurred while SecretAccessError: ${error}`);
  }
};

module.exports = {
  getSecretValue,
};
