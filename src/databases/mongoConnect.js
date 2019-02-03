import Mongoose from 'mongoose';



class DbConnect {
  static mongooseConnection;

  static connect() {
    console.log("MOngo", process.env.DB_CONNECTION_STRING);
    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
    DbConnect.mongooseConnection = Mongoose.connection;

    const options = {
      useNewUrlParser: true,
      keepAlive: process.env.MONGO_CONNECTION_KEEP_ALIVE || 300000,
      connectTimeoutMS: process.env.MONGO_CONNECTION_TIMEOUTS || 30000,
    };

    DbConnect.mongooseConnection.once('open', () => {
      console.log('Connected to mongodb ', DB_CONNECTION_STRING);
    });

    DbConnect.mongooseConnection.on('error', () => {
      console.log('Mongoose connection error');
    });

    Mongoose.set('debug', true);

    Mongoose.connect(DB_CONNECTION_STRING, options);
  }

}

export default DbConnect;
