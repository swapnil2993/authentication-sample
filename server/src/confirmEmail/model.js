import mongoose from 'mongoose';

import VerifyEmailSchema from './schema';

class VerifyEmailModel {
  static findByToken(token) {
    return this.findOne({ token: token })
  }
}

const schema = new VerifyEmailSchema();
schema.loadClass(VerifyEmailModel);

export default mongoose.model('VerifyEmail', schema);