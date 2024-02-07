import http from 'node:http';

const host = 'localhost';
const port = 8900;

const server = http.createServer((request, response) => {
  request.headers;
  response.setHeader('Content-Type', 'text/plain');
  response.statusCode = 200;
  response.end(JSON.stringify('Liasu Aanuoluwapo'));
});

server.listen(port, host, () => {
  console.log(`Server is listening on http://${host}:${port}`);
});
