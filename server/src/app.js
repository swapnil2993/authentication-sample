import createError from 'http-errors';
import express from 'express';
import helmet from 'helmet';

import DbConnect from './databases/mongoConnect';
import Middlewares from './middleware';

let app = express();

app.use(helmet());
app.disable('x-powered-by');
app.set('view-engine', 'jade');

DbConnect.connect();
app.use(Middlewares.configuration);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
