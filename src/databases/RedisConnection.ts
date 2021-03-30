import redis from 'redis';
import logger from '../shared/logger';

const options = {
  host: '127.0.0.1',
  port: 6379
};


export const connectToRedis = () => {
  const client = redis.createClient(options);

  client.on("ready", () => {
    logger.info("DB Ready");
  });

  client.on("error", (err: string) => {
    logger.info("Error " + err);
  });

  return client;
};
