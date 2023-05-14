const knex = require('knex');
const fs = require('fs');

const { getPoolConfigurations } = require('./dbConfig');
const mybatisMapper = require('mybatis-mapper');

let connection;

const initializePgConnection = async () => {
  if (connection) {
    return connection;
  }
  try {
    const poolConfig = await getPoolConfigurations();
    connection = await knex(poolConfig);
    console.log('Database connected successfully');

    return connection;
  } catch (error) {
    console.log(`Database connection error - ${error}`);
    throw error;
  }
};

const closePool = async () => {
  try {
    console.log('Closing connection pool');
    await connection.destroy();
    console.log('Connection pool closed');
  } catch (error) {
    console.log('Error closing pool -', error);
    throw error;
  }
};

const getDbConnection = async () => {
  try {
    if (connection) {
      return connection;
    } else {
      return initializePgConnection();
    }
  } catch (err) {
    console.log('Database connection error: ', err);
    throw new Error('DATABASE_SQL_ERROR');
  }
};

const executeQuery = async (mapperNamespace, sqlId, params = {}) => {
  console.log('Called SQL Id - ', sqlId, ' with param - ', params);

  try {
    const connection = await getDbConnection();
    let sql = await mybatisMapper.getStatement(mapperNamespace, sqlId, params);
    sql = sql?.replace(/(\n|\r|\t)/gm, ' ').trim();

    console.log('Query Called ->   ', sql);
    let result = await connection.raw(sql);
    console.log('Query result ->   ', result?.rows);

    return result;
  } catch (error) {
    console.log(`Database Error: ${error}`);
    throw new Error();
  }
};

const loadBatisMappers = () => {
  let files = fs.readdirSync(`./src/mappers`);

  let mappers = files.map((file) => {
    let filepath = `./src/mappers/${file}`;
    console.log(`loading mapper: ${filepath}`);
    return filepath;
  });

  mybatisMapper.createMapper(mappers);
  console.log(`Mappers initialized successfully`);
};

module.exports = { initializePgConnection, executeQuery, loadBatisMappers };
