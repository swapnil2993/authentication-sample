import createError from 'http-errors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import DbConnect from './databases/mongoConnect';
import Middlewares from './middleware';

let app = express();

app.use(helmet());
app.disable('x-powered-by');
app.set('view-engine', 'jade');

DbConnect.connect();
app.use(express.static(path.join(__dirname, '../webclient/build')));
app.use(cors());
app.options('*', cors());
app.use(Middlewares.configuration);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../webclient/build/index.html'));
});

module.exports = app;
