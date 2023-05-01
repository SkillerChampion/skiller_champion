require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const env = process.env.NODE_ENV || 'dev';
console.log(`Node environment set to - ${env}`);
const config = require(`./${env}`);

config.env = env;

module.exports = Object.freeze({ ...config });
