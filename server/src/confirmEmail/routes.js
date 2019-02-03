import { Router } from 'express';
import VerifyEmailController from './controller';
import Validators from './validators';

class VerifyEmailRoutes {
  constructor() {
    this._controller = new VerifyEmailController();
    this._validator = new Validators();
  }

  get routes() {
    const router = Router();
    router.get('/verify/:token', this._validator.verifyEmail, this._controller.verifyEmail);
    router.post('/resend_verify_mail', this._validator.resendEmailVerification, this._controller.resendEmailVerification);
    return router;
  }
}

export default VerifyEmailRoutes;