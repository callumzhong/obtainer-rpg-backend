/* eslint-disable global-require */
require('dotenv').config();

if (process.env.NODE_ENV !== 'test') {
  require('./connections/main.connection');
} else {
  require('./connections/test.connection');
}

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const swaggerOptions = require('./swagger-options');
const errorHandler = require('./middlewares/errorHandler');
const indexRouter = require('./routes/index');

const app = express();
expressJSDocSwagger(app)(swaggerOptions);

if (process.env.NODE_ENV === 'dev') {
  process.on('uncaughtException', (err) => {
    console.error('Uncaughted Exception！');
    console.error(err);
    process.exit(1);
  });
}

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: '無此路由資訊',
  });
});

app.use(errorHandler);

process.on('unhandledRejection', (err, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', err);
});

module.exports = app;
