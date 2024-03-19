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

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ success: true });
});
app.use(router);

//Catch all error handling
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});

//NOTE: THE DATA ARE NOT PERSISTENT AS THERE IS NO LINKED DATABASE
