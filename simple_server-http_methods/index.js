import { readFileSync } from 'node:fs';
import http from 'node:http';

const host = 'localhost';
const port = 8900;

export const getBooks = () => {
  try {
    const rawText = readFileSync('./data.json', { encoding: 'utf8' });
    const books = JSON.parse(rawText);
    return books;
  } catch (error) {
    return;
  }
};

const handleRequest = (request, response, body) => {
  const books = getBooks();
  switch (request.method) {
    case 'GET':
      response.end(
        JSON.stringify({
          method: `${request.method}`,
          books,
        })
      );
      break;
    case 'POST':
      if (body) {
        const data = JSON.parse(body);
        const newBook = {
          id: books.length + 1,
          title: data.title,
          author: data.author,
          format: data.format,
        };
        books.push(newBook);
      }
      response.end(
        JSON.stringify({
          method: `${request.method}`,
          books,
        })
      );
      break;
    case 'PUT':
      response.end(
        JSON.stringify({
          method: `${request.method}`,
          books,
        })
      );
      break;
    case 'DELETE':
      response.end(
        JSON.stringify({
          method: `${request.method}`,
          books,
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
    switch (request.url) {
      case '/books':
        handleRequest(request, response, body);
        break;

      case '/books/author':
        handleRequest(request, response, body);
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
