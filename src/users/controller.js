import UserModel from './model';
import TokenController from '../token/controller';
import VerifyEmailController from '../confirmEmail/controller';
import { triggerEmail, verifyEmailTemplate } from '../utils/emails';

class UserController {
  constructor() {
    this._tokenController = new TokenController();
    this._verifyEmailController = new VerifyEmailController();

    this.createAccount = this.createAccount.bind(this);
    this.signin = this.signin.bind(this);
  }

  async createAccount(req, res) {
    const {
      firstName, lastName, password, email,
    } = req.body;
    let result = null;
    let user = null;
    try {
      result = await UserModel.create({ firstName, lastName, password, email });
      user = result.toJSON();

      const generatedTokenObject = await this._verifyEmailController.createVerificatonToken(user._id);
      if (generatedTokenObject) {
        const emailTemplate = verifyEmailTemplate(generatedTokenObject.token);
        const mailOptions = {
          to: user.email,
          html: emailTemplate,
          subject: 'Email Verification Link'
        }
        const emailResult = await triggerEmail(mailOptions);
        if (emailResult.statusCode >= 200 && emailResult.statusCode < 400) {
          return res.status(200).json({ data: user, message: "Email has been sent to verify your email" });
        } else {
          await UserModel.deleteOne({ _id: result.id });
        }
      }
    } catch (error) {
      await UserModel.deleteOne({ _id: result.id });
      return res.status(400).json({ error: error.message })
    }
  }

  async signin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email })
      if (user) {
        const isPasswordValid = await user.validatePassword(password);
        const userObject = user.toJSON();

        if (isPasswordValid) {
          if (!userObject.isVerified) {
            const data = { email: userObject.email, id: userObject._id, isVerified: userObject.isVerified }
            return res.status(403).json({ message: "Please verify email inorder to use our services", data })
          }

          userObject.token = await new TokenController().createToken({ id: userObject._id, email: userObject.email });
          return res.status(200).json({ message: "Login Successful", data: userObject })
        }
      }
      return res.status(400).json({ message: 'Invalid Credentials. Please try again' });
    } catch (error) {
      return res.json({ message: error.message })
    }
  }

  async userInfo(req, res) {
    const { user } = req;
    return res.send({ user });
  }
}

module.exports = UserController;