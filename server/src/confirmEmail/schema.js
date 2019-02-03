import mongoose from 'mongoose';
import BaseSchema from '../base/schema';

class VerifyEmailSchema extends BaseSchema {
  constructor() {
    super({
      userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
      token: { type: String, required: true },
      createdAt: { type: Date, required: true, default: Date.now, expires: process.env.VERIFICATION_TOKEN_EXPIRATION }
    })
  }
}

export default VerifyEmailSchema;