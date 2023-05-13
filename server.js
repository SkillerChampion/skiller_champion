const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { initializePgConnection, loadBatisMappers } = require('./src/utils/database/database');
const configurations = require('./config');
const { DEPLOYED_ORIGIN_URL, NODE_ENVS } = require('./src/utils/constants');
const { validateToken } = require('./src/middleware/auth');

loadBatisMappers();
initializePgConnection();

// Set up CORS middleware to allow requests from a specific URL
const corsOptions = {
  origin: DEPLOYED_ORIGIN_URL,
};

if (configurations.NODE_ENV === NODE_ENVS.development) {
  app.use(cors());
} else {
  console.log('Activated CORS to whitelist deployed domain - ', corsOptions.origin);
  app.use(cors(corsOptions));
}

app.use(express.json({ extended: false }));

app.get('/api/health', async (req, res) => {
  console.log(`Node environment set to - ${configurations.NODE_ENV}`);
  res.send('FE Node app is running fine');
});

app.use('/api/public', require('./src/routes/openService'));

app.use('/api/hederaService', validateToken, require('./src/routes/hederaService'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = configurations.PORT || 8080;

app.listen(PORT, function () {
  console.log(`Server started on PORT ${PORT}`);
});
