const configurations = require('../../../config');
const { NODE_ENVS } = require('../constants');
const { getDynamicEnv } = require('../helperFunctions');

const getPoolConfigurations = async () => {
  const config = {
    pool: {
      max: 10,
      min: 2,
      acquireTimeoutMillis: 60000,
    },
    createTimeoutMillis: 30000,
    idleTimeoutMillis: 600000,
    createRetryIntervalMillis: 200,
  };
  return await createTcpPool(config);
};

const createTcpPool = async (config) => {
  // const dbSocketAddr = configurations.dbHost?.split(':');

  const dbUser = configurations.dbUser;
  const dbPass = await getPassword();

  const dbConfig = {
    client: 'pg',
    connection: {
      user: dbUser,
      password: dbPass,
      database: configurations.database,
      host: configurations.dbHost,
      // port: dbSocketAddr?.[1],
    },

    ...config,
  };
  return dbConfig;
};

const getPassword = async () => {
  return getDynamicEnv(configurations.dbPassword);
};

module.exports = { getPoolConfigurations };
