const fs = require("fs");

const contentType = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  png: 'image/png'
};

const determineContentType = (fileName) => {
  const extension = fileName.split('.').slice(-1);
  return contentType[extension] || 'text/plain';
};

const products = {
  blueTop: {
    name: 'Blue Top',
    price: 300,
    image: 'blueTop.jpg'
  },
  redTop: {
    name: 'Red Top',
    price: 400,
    image: 'redTop.jpg'
  },
  sandals: {
    name: 'sandals',
    price: 600,
    image: 'sandals.jpg'
  },
  heels: {
    name: 'heels',
    price: 1000,
    image: 'heels.jpg'
  }
}

const cart = {};

const addToCart = (request) => {
  const { queryParams } = request;
  const productsAdded = Object.keys(queryParams);
  productsAdded.forEach((product) => {
    if (products[product]) {
      cart[product] = products[product];
    }
  })
};

const getProducts = (cart) => {
  let products = '';
  Object.values(cart).forEach(({ name, price }) => {
    products += `<div>${name}: ${price}</div>`
  })
  return products;
};

const getTotalPrice = (cart) => {
  return Object.values(cart).reduce((totalPrice, { price }) => {
    return totalPrice + price;
  }, 0)
};

const showCart = ({ path }, response) => {
  const template = fs.readFileSync(`public/${path}`, 'utf8');
  const products = getProducts(cart);
  const totalPrice = getTotalPrice(cart);
  let cartItems = template.replace('PRODUCTS', products);
  cartItems = cartItems.replace('TOTAL', totalPrice);
  response.send(cartItems);
  // response.send(JSON.stringify(cart));
};

const serveFileContent = (request, response, serveFrom = './public') => {
  if (request.path === '/addToCart') {
    addToCart(request);
    response.statusCode = 302;
    response.setHeader('location', '/cart.html');
    response.send('');
  }

  if (request.path === '/cart.html') {
    showCart(request, response);
  }

  const fileName = `${serveFrom}${request.path}`;

  if (!fs.existsSync(fileName)) {
    return false;
  }

  response.setHeader('content-type', determineContentType(fileName));
  const content = fs.readFileSync(fileName);
  response.send(content);
  return true;
};

module.exports = { serveFileContent };
