import express from 'express';
import UserRoutes from './users/routes';
import VerifyEmailRoutes from './confirmEmail/routes';


class Routes {
  get routes() {
    const app = express();
    app.use('/', new UserRoutes().routes);
    app.use('/', new VerifyEmailRoutes().routes);
    return app;
  }
}

export default Routes;
