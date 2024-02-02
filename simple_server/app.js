import http from 'node:http';

const host = 'localhost';
const port = 8900;

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  response.end(
    JSON.stringify({
      name: 'Liasu Aanuoluwapo',
    })
  );
});

server.listen(port, host, () => {
  console.log(`Server is listening on http://${host}:${port}`);
});
