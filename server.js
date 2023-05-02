const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { initializePgConnection, loadBatisMappers } = require('./src/utils/database/database');
const configurations = require('./config');
const { getSecretValue } = require('./src/utils/secretManager');

loadBatisMappers();
initializePgConnection();

app.use(
  cors({
    origin: function (origin, callback) {
      // replace with your React app's URL
      if (origin !== 'http://localhost:3000') {
        return callback(new Error('Not allowed by CORS'));
      }
      callback(null, true);
    },
  })
);

app.use(express.json({ extended: false }));

console.log(
  'CHECKING ENVS - ',
  process.env.DB_USER,
  configurations.dbPassword,
  configurations.database,
  configurations.dbHost
);

app.get('/api/health', async (req, res) => {
  console.log('Secret check - ', await getSecretValue(configurations.dbPassword));
  res.send('FE Node app is running');
});

app.use('/api/hederaService', require('./src/routes/hederaService'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`Server started on PORT ${PORT}`);
});
