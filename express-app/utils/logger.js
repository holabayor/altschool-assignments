// Logger middleware

const logger = (req, res, next) => {
  console.log(
    'Request',
    JSON.stringify({
      url: req.url,
      method: req.method,
      IP: req.socket.remoteAddress,
      time: new Date(),
      body: req.body,
      query: req.query,
    })
  );
  next();
};

module.exports = logger;
