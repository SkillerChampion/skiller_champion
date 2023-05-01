const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { initializePgConnection, loadBatisMappers } = require('./src/utils/database/database');
const configurations = require('./config');
const { getSecretValue } = require('./src/utils/secretManager');

loadBatisMappers();
initializePgConnection();

app.use(cors());
app.use(express.json({ extended: false }));

console.log(
  'CHECKING ENVS - ',
  configurations.dbUser,
  configurations.dbPassword,
  configurations.database,
  configurations.dbHost
);

app.get('/api/health', async (req, res) => {
  console.log(
    'CHECKING ENVS - ',
    process.env.DB_USER,
    configurations.dbPassword,
    configurations.database,
    configurations.dbHost
  );

  console.log(
    'CHECKING SECRETS - ',
    process.env.REACT_APP_NODE_BE_OPEN_SOURCE_API,
    process.env.DATABASE,
    await getSecretValue(configurations.dbPassword)
  );
  res.send('FE Node app is running');
});

app.use('/api/hederaService', require('./src/routes/hederaService'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = 8080;

app.listen(PORT, function () {
  console.log(`Server started on PORT ${PORT}`);
});
