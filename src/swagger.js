const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movie Rater',
    description: 'Description'
  },
  host: 'cse341w08project.onrender.com'
};

const outputFile = './swagger-output.json';
const routes = ['../dist/routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);