import http from 'node:http';

const host = 'localhost';
const port = 8900;

const booksDB = [
  {
    id: 1,
    title: 'The Adventures of Huckleberry Finn',
    author: 'Mark Finn',
    format: 'pdf',
  },
  {
    id: 2,
    title: 'Mystery of the Ancient Ruins',
    author: 'Emily Smith',
    format: 'epub',
  },
  {
    id: 3,
    title: 'Journey Through the Stars',
    author: 'Michael Johnson',
    format: 'pdf',
  },
  {
    id: 4,
    title: 'Secrets of the Deep Ocean',
    author: 'Laura Brown',
    format: 'txt',
  },
  {
    id: 5,
    title: 'The Art of Cooking Beans',
    author: 'Tobi Oyelami',
    format: 'pdf',
  },
];

const handleRequest = (request, response, body) => {
  switch (request.method) {
    case 'GET':
      response.end(JSON.stringify(booksDB));
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
  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    console.log(request.url);
    switch (request.url) {
      case '/books':
        handleRequest(request, response, body);
        break;

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
