//module definitions for express app
const express = require('express');
const path = require('path');
const port = process.env.PORT || '8081';
// create express app
const app = express();

//json server as REST API
const jsonServer = require('json-server');
const server = jsonServer.create();
// Returns an Express router
const router = express.Router();
const mainRoute  = jsonServer.router('./src/json/clients.json');
//const middlewares = jsonServer.defaults({ noCors: false });
const middlewares = jsonServer.defaults();
const portApi = process.env.PORT || '3001';

//APP settings
// Serve only the static files form the dist directory
//app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('dist'));

//Wait for a request to any path and redirect all of the requests to index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the app by listening on desired port(ex: Default Heroku port 8080)
app.listen(port, () => {
  console.log(`Running server(HTTP) on port :${port}`);
});
//APP settings end

//settings for json server as REST API
//router.use('/', mainRoute);
// Set default middlewares (logger, static, cors and no-cache)
// server.use(middlewares);
// server.use(router);
// server.listen(portApi,() => {
//   console.log(`Running json-server(API) on localhost:${portApi}`);
// });
//settings for json server as REST API end
