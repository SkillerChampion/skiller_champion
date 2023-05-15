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

  const dbUser = await getDynamicEnv(configurations.dbUser);
  const dbPass = await getDynamicEnv(configurations.dbPassword);
  const name = await getDynamicEnv(configurations.database);
  const host = await getDynamicEnv(configurations.dbHost);

  const dbConfig = {
    client: 'pg',
    connection: {
      user: dbUser,
      password: dbPass,
      database: name,
      host: host,
      port: configurations.dbPort,
      min: 2,
      max: 6,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false,
    },

    ...config,
  };
  return dbConfig;
};

module.exports = { getPoolConfigurations };
