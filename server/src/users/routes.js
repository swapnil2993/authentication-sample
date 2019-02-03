import { Router } from 'express';
import UserController from './controller';
import Validators from './validators';
import TokenController from '../token/controller';

class UserRoutes {
  constructor() {
    this._userController = new UserController();
    this._userValidator = new Validators();
    this._tokenController = new TokenController();
  }

  get routes() {
    const router = Router();
    router.post('/signin', this._userValidator.signin, this._userController.signin);
    router.post('/create', this._userValidator.createAccount, this._userController.createAccount);
    router.get('/userinfo', this._tokenController.verifyToken, this._userController.userInfo)
    return router;
  }
}

export default UserRoutes;