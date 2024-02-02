import http from 'node:http';

const host = 'localhost';
const port = 8000;

const mockDB = {
  books: [
    { id: 1, title: 'The Great Adventure', author: 'John Doe' },
    { id: 2, title: 'Mystery of the Ancient Ruins', author: 'Emily Smith' },
    { id: 3, title: 'Journey Through the Stars', author: 'Michael Johnson' },
    { id: 4, title: 'Secrets of the Deep Ocean', author: 'Laura Brown' },
  ],
  authors: [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Emily Smith' },
    { id: 3, name: 'Michael Johnson' },
    { id: 4, name: 'Laura Brown' },
  ],
};

const handleRequest = (request, response, body) => {
  switch (key) {
    case 'GET':
      response.end(
        JSON.stringify({
          data: 'Get request here!',
        })
      );
      break;
    case 'PUT':
      response.end(
        JSON.stringify({
          data: 'Put request here!',
        })
      );
      break;
    case 'DELETE':
      response.end(
        JSON.stringify({
          data: 'Delete here!',
        })
      );
      break;
    case 'POST':
      response.end(
        JSON.stringify({
          data: 'Delete here!',
        })
      );
      break;
    default:
      response.statusCode = 405;
      response.end(
        JSON.stringify({
          error: 'Method not allowed',
        })
      );
  }
};

const requestHandler = (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  let body = '';
  request.on('end', () => {
    switch (request.url) {
      case '/books':

      case '/books/author':
        if (request.method === 'GET') {
          response.end(
            JSON.stringify({
              data: 'Get request here!',
            })
          );
        } else if (request.method === 'POST') {
          response.end(
            JSON.stringify({
              data: 'Post request here!',
            })
          );
        } else if (request.method === 'PUT') {
          response.end(
            JSON.stringify({
              data: 'Put here!',
            })
          );
        } else {
          response.statusCode = 405;
          response.end(
            JSON.stringify({
              error: 'Method not allowed',
            })
          );
        }
        break;
      default:
        response.statusCode = 404;
        response.end(
          JSON.stringify({
            error: 'Not found',
          })
        );
    }
  });
};

const server = http.createServer(requestHandler);

server.listen(port, host, () => {
  console.log(`Server is listening on http://${host}:${port}`);
});
