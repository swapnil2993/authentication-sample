import mongoose from 'mongoose';
const bcrypt = require('bcrypt');
const saltRounds = 10;
import UserSchema from './schema';

class UserModel {
  static findByEmail(email) {
    return this.findOne({ email: email })
  }

  async saveHashedPassword(next) {
    if (!this.isModified('password')) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

const schema = new UserSchema();

schema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

schema.loadClass(UserModel);

schema.pre('save', function (next) {
  this.saveHashedPassword(next)
});


export default mongoose.model('User', schema);