import logger from '../shared/logger';
import mongoose from 'mongoose'
import config from '../config';

// const uri = 'mongodb://mongo:27017/test-Dcard-01';
// const uri = `mongodb://127.0.0.1:27017/test-Dcard-01`;
const uri = `mongodb://${config.mongodb}:27017/test-Dcard-01`;

const connectOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

export const connectToMongo = () => {
  mongoose.connect(uri, connectOptions, () => {
    logger.info('connected to database');
  });
};
