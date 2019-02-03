import handleErrors from '../utils/errorHandler';

class Validators {
  verifyEmail(req, res, next) {
    req.checkParams('token').notEmpty();
    const errors = req.validationErrors();
    let response = {
      error: '',
    }
    if (errors) {
      const message = handleErrors(errors);
      response.error = message;
      return res.status(422).json(response);
    }
    next();
  }

  resendEmailVerification(req, res, next) {
    req.checkBody('email').notEmpty().isEmail();
    const errors = req.validationErrors();
    let response = {
      error: '',
    }
    if (errors) {
      const message = handleErrors(errors);
      response.error = message;
      return res.status(422).json(response);
    }
    next();
  }
}

export default Validators;