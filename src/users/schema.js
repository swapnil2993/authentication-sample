import mongoose from 'mongoose';
import BaseSchema from '../base/schema';

class UserSchema extends BaseSchema {
  constructor() {
    super({
      firstName: String,
      lastName: String,
      email: { type: String, unique: true },
      isVerified: { type: Boolean, default: false },
      password: { type: String, required: true },
    }, {
        toJSON: {
          transform: function (doc, ret) {
            delete ret.password;
            delete doc.password;
          }
        }
      })
  }
}

export default UserSchema;