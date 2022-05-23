/* import custom modules */
const serverFunc = require('./server/server');
/* import node modules */
const createError = require('http-errors');
const logger = require('morgan');
const apiRouter = require('./src/route.js');
const app = require('express')();
const express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer')

const server = require('http').createServer(app);
/* setting socket.io */
const env = process.env.NODE_ENV || 'development';

app.get('/', function (req, res) {
  res.send(200);
});

server.listen(3000, function () {
  console.log('Commerce server listening on port 3000');
});

server.on('error', async (error) => {
  await serverFunc.onError(error)
});

server.on('listening', async () => {
  await serverFunc.onListening(server)
});

app.use(express.json())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', apiRouter)

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(logger('combined'));

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.use(function (req, res, next) {
  next(createError(404));
});

exports.server = server;