// Logger middleware

const logger = (req, res, next) => {
  console.log(
    'REQUEST:',
    {
      url: req.url,
      method: req.method,
      IP: req.socket.remoteAddress,
      time: new Date(),
      body: req.body,
      query: req.query,
    },
    '\n'
  );
  next();
};

module.exports = logger;
