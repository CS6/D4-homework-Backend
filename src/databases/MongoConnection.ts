import logger from '../shared/logger';
import mongoose from 'mongoose'
import config from '../config';

// const uri = 'mongodb://mongo:27017/test-Dcard-01';
// const uri = `mongodb://127.0.0.1:27017/test-Dcard-01`;
const uri = `mongodb://${config.mongodb}:27017/test-Dcard`;

const connectOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

export const connectToMongo = () => {
  mongoose.connect(uri, connectOptions, () => {
    logger.info('connected to database');
  });
  mongoose.Promise = Promise; // yea... this is kinda odd 

  mongoose.connection.on("connected", () => {
      console.log("Connection Established");
  });

  mongoose.connection.on("reconnected", () => {
      console.log("Connection Reestablished");
  });

  mongoose.connection.on("disconnected", () => {
      console.log("Connection Disconnected");
  });

  mongoose.connection.on("close", () => {
      console.log("Connection Closed");
  });

  mongoose.connection.on("error", (error) => {
      console.log("ERROR: " + error);
  });
  return mongoose;
};
export const connectedMongo = () => {
  mongoose.disconnect(function(){
    mongoose.connection.close();
  });
};

