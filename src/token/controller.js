import jwt from 'jsonwebtoken';
import UserModel from '../users/model';

class Authenticate {
  constructor() {
    this.secretKey = process.env.SECRET_KEY_PASSWORD;
    this.createToken = this.createToken.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  async createToken(payload) {
    try {
      const token = await jwt.sign({
        exp: Math.floor(Date.now() + process.env.TOKEN_EXPIRY_TIME), data: payload,
      }, this.secretKey);
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send({ error: 'TokenMissing' });
    }
    const [, bearerToken] = req.headers.authorization.split(' ');
    try {
      const decodedPayload = await jwt.verify(bearerToken, this.secretKey);
      if (decodedPayload) {
        const { data } = decodedPayload;
        const user = await UserModel.findOne({ _id: data.id });
        if (user) {
          req.user = user.toJSON();
          next();
        }
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).send({ message: "Token Expired" });
      }
      return res.status(401).send({ message: error.message });
    }
  };
}

export default Authenticate;