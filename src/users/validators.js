import UserModel from './model';
import handleErrors from '../utils/errorHandler';

class Validators {

  async createAccount(req, res, next) {
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
    req.checkBody('email', 'Enter valid emailId').isEmail()
      .normalizeEmail();
    req.checkBody('password', 'Password should not be empty')
      .notEmpty();
    req.checkBody('confirmPassword', 'Password should not be empty')
      .notEmpty();

    const errors = req.validationErrors();
    let response = {
      error: '',
    }
    if (errors) {
      const message = handleErrors(errors);
      response.error = message;
      return res.status(422).json(response);
    }

    if (req.body.password !== req.body.confirmPassword) {
      response.error = 'Passwords do not match';
      return res.status(422).json(response);
    }

    if (req.body.email) {
      try {
        let result = await UserModel.findByEmail(req.body.email);
        if (result) {
          response.error = 'Email already exists'
          return res.status(409).json(response);
        }
      } catch (error) {
        response.error = error.message;
        return res.status(400).json(response);
      }
    }
    next();
  }

  signin(req, res, next) {
    req.checkBody('email', 'Enter valid emailId').isEmail()
      .normalizeEmail();
    req.checkBody('password', 'Password should not be empty')
      .notEmpty();

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