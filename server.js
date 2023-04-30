const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { initializePgConnection, loadBatisMappers } = require('./src/utils/database/database');

loadBatisMappers();
initializePgConnection();

app.use(cors());
app.use(express.json({ extended: false }));

app.get('/api/health', (req, res) => res.send('BE Hedera app is running'));

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
