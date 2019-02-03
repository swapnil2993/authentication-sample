import express from 'express';
import { json, urlencoded } from 'body-parser';
import expressValidator from 'express-validator';
import BaseRoutes from './routes';

class Middleware {
  static get configuration() {
    const app = express();
    app.use(json({
      limit: 1024 * 1024 * 30
    }));
    app.use(urlencoded({
      extended: true,
      limit: 1024 * 1024 * 30
    }));
    app.use(expressValidator());
    app.use('/api',new BaseRoutes().routes);
    return app;
  }
}

export default Middleware;