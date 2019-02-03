import mongoose from 'mongoose';
import crypto from 'crypto';

import VerifyEmailModel from './model';
import UserModel from '../users/model';
import { resendEmailVerificationTemplate, triggerEmail } from '../utils/emails';

class EmailVerificationController {
  constructor() {
    this.createVerificatonToken = this.createVerificatonToken.bind(this);
    this.resendEmailVerification = this.resendEmailVerification.bind(this);
  }

  async verifyEmail(req, res) {
    const { token } = req.params;
    let verifyEmailResult = null;
    if (token) {
      try {
        verifyEmailResult = await VerifyEmailModel.findByToken(token);
        if (verifyEmailResult) {
          const userResult = await UserModel.findByIdAndUpdate(verifyEmailResult.userId, { isVerified: true })
          if (userResult) {
            const user = userResult.toJSON();
            return res.json({ message: 'Email verified successfully', data: user })
          } else {
            return res.status(500).json({ error: "Something went wrong" })
          }
        } else {
          return res.json({ message: 'Link has expired. Please resend email' })
        }
      } catch (error) {

        return res.status(400).json({ error: error.message });
      }
    }
  }

  async resendEmailVerification(req, res) {
    const { email } = req.body;
    try {
      const result = await UserModel.findByEmail(email);
      if (result) {
        const user = result.toJSON();
        const generatedTokenObject = await this.createVerificatonToken(user._id);
        if (generatedTokenObject) {
          const emailTemplate = resendEmailVerificationTemplate(generatedTokenObject.token);
          const mailOptions = {
            to: user.email,
            html: emailTemplate,
            subject: "Resend Email Verification Link"
          }
          const emailResult = await triggerEmail(mailOptions);
          if (emailResult.statusCode >= 200 && emailResult.statusCode < 400) {
            return res.status(200).json({ message: "Email has been sent for verification" });
          }
        }
      } else {
        return res.status(404).json({ error: "Email does not exist" });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async createVerificatonToken(userId) {
    try {
      const token = crypto.randomBytes(16).toString('hex');
      const result = await VerifyEmailModel.create({ userId: mongoose.Types.ObjectId(userId), token });
      if (result) {
        return result.toJSON()
      }
    } catch (error) {
      throw Error(error);
    }
  }
}

export default EmailVerificationController;