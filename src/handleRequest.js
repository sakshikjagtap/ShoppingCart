const { serveFileContent } = require("./serveFileContent");

const html = (content) => `<html><body>${content}</body></html>`;

const chooseCategory = (request, response) => {
  const { category } = request.queryParams;
  if (category === 'clothes') {
    response.statusCode = 302;
    response.setHeader('location', '/dresses.html');
    response.send('hello');
    return true;
  }
  if (category === 'footwear') {
    response.statusCode = 302;
    response.setHeader('location', '/dresses.html');
    response.send('hello');
    return true;
  }
  return false;
};

const handleRequest = (request, response) => {
  const { path } = request;
  if (path === '/index.html') {
    serveFileContent(request, response);
  }
  if (path === '/operation') {
    chooseCategory(request, response);
  }

  return false;
};

module.exports = { handleRequest };
