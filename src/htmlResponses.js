const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styles = fs.readFileSync(`${__dirname}/../client/client.css`);
const respondHTML = (request, response, content) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(content);
  response.end();
};
const respondCSS = (request, response, content) => {
  response.writeHead(200, {
    'Content-Type': 'text/css',
  });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respondHTML(request, response, index);
};

const getCSS = (request, response) => {
  respondCSS(request, response, styles);
};

module.exports = {
  getCSS,
  getIndex,
};
