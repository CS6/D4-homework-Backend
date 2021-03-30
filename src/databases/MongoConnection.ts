import logger from '../shared/logger';
import mongoose from 'mongoose'

const uri = 'mongodb://localhost:27017/test-Dcard-01';

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
