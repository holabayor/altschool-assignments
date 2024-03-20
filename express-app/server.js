const express = require('express');
const { logger, responseLogger } = require('./utils/logger');
const router = require('./routes');

const app = express();

const port = 8900;
const host = 'localhost';

// Middlewares
app.use(express.json());
app.use(logger);
app.use(responseLogger);

// Server test route
app.get('/', (req, res) => {
  res.status(200).json({ success: true });
});
app.use(router);

//Catch all error handling
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
