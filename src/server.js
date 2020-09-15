const http = require('http');
const url = require('url');
const query = require('querystring');
const responseHandler = require('./responses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);
  console.log(parsedUrl);
  console.log(acceptedTypes);
  switch (parsedUrl.pathname) {
    case '/':
      // htmlHandler.getCSS(request, response);
      htmlHandler.getIndex(request, response);
      break;
    case '/client.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/success':
      responseHandler.success(request, response, acceptedTypes);
      break;
    case '/badRequest':
      responseHandler.badRequest(request, response, params, acceptedTypes);
      break;
    case '/unauthorized':
      responseHandler.unauthorized(request, response, params, acceptedTypes);
      break;
    case '/forbidden':
      responseHandler.forbidden(request, response, acceptedTypes);
      break;
    case '/internal':
      responseHandler.internal(request, response, acceptedTypes);
      break;
    case '/notImplemented':
      responseHandler.notImplemented(request, response, acceptedTypes);
      break;
    default:
      responseHandler.notFound(request, response, acceptedTypes);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
