const respondXML = (request, response, status, content) => {
  response.writeHead(status, {
    'Content-Type': 'text/xml',
  });
  response.write(content);
  response.end();
};
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(object));
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    title: 'Success!',
    message: 'This is a successful response',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
      <title>${responseJSON.title}</title>
        <message>${responseJSON.message}</message>
      </response>
    `;
    return respondXML(request, response, 200, responseXML); // bail out
  }

  return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  if (!params.valid || params.valid !== 'true') {
    responseJSON.title = 'Error – Bad Request';
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    if (acceptedTypes[0] === 'text/xml') { // if query is invalid and text is xml
      const responseXML = `
        <response>
        <title>${responseJSON.title}</title>
          <message>${responseJSON.message}</message>
          <id>${responseJSON.id}</id>
        </response>
      `;
      return respondXML(request, response, 400, responseXML); // bail out
    }
    return respondJSON(request, response, 400, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};
const unauthorized = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This request has the required loggedIn parameter.',
  };
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes.';
    responseJSON.id = 'unauthorized';
    responseJSON.title = 'Error – Unauthorized';
    if (acceptedTypes[0] === 'text/xml') { // if query is invalid and text is xml
      const responseXML = `
        <response>
        <title>${responseJSON.title}</title>
          <message>${responseJSON.message}</message>
          <id>${responseJSON.id}</id>
        </response>
      `;
      return respondXML(request, response, 401, responseXML); // bail out
    }
    return respondJSON(request, response, 401, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    title: 'Error 404 – Page not Found',
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
      <title>${responseJSON.title}</title>
        <message>${responseJSON.message}</message>
        <id>${responseJSON.id}</id>
      </response>
    `;
    return respondXML(request, response, 404, responseXML); // bail out
  }
  return respondJSON(request, response, 404, responseJSON);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    title: 'Error 403 – Forbidden',
    message: 'You sent valid data, but you are forbidden to view this.',
    id: 'forbidden',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
      <title>${responseJSON.title}</title>
        <message>${responseJSON.message}</message>
        <id>${responseJSON.id}</id>
      </response>
    `;
    return respondXML(request, response, 403, responseXML); // bail out
  }
  return respondJSON(request, response, 403, responseJSON);
};
const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    title: 'Error 500',
    message: 'Internal server error',
    id: 'internal',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
      <title>${responseJSON.title}</title>
        <message>${responseJSON.message}</message>
        <id>${responseJSON.id}</id>
      </response>
    `;
    return respondXML(request, response, 500, responseXML); // bail out
  }
  return respondJSON(request, response, 500, responseJSON);
};
const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    title: 'Error 501 – Not implemented',
    message: 'This response has not been implemented yet.',
    id: 'notImplemented',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
      <response>
      <title>${responseJSON.title}</title>
        <message>${responseJSON.message}</message>
        <id>${responseJSON.id}</id>
      </response>
    `;
    return respondXML(request, response, 501, responseXML); // bail out
  }
  return respondJSON(request, response, 501, responseJSON);
};

module.exports = {
  success,
  badRequest,
  notFound,
  forbidden,
  internal,
  notImplemented,
  unauthorized,
};
