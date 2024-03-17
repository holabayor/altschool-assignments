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

const responseLogger = (req, res, next) => {
  const originalEnd = res.end;

  // Create a buffer to store chunks of the response body
  let chunks = [];

  res.end = function (chunk, ...rest) {
    if (chunk) {
      chunks.push(Buffer.from(chunk));
    }
    console.log(
      'RESPONSE:',
      {
        statusCode: res.statusCode,
        body: Buffer.concat(chunks).toString('utf8'),
      },
      '\n'
    );

    // Call the original `res.end` method so that the response is sent to the client
    originalEnd.apply(this, [chunk, ...rest]);
  };

  next();
};

module.exports = { responseLogger, logger };
