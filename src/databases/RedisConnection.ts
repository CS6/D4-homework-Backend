import redis from 'redis';
import logger from '../shared/logger';
import config from '../config';

// const options = {
//   host: 'redis-server',
//   port: 6379,
//   connect_timeout:2000
// };
// const options = {
//   host: '127.0.0.1',
//   port: 6379,
//   connect_timeout:2000
// };

const options = {
  host: `${config.redis}`,
  port: 6379,
  connect_timeout:2000
};


export const connectToRedis = () => {
  const client = redis.createClient(options);

  client.on("ready", () => {
    logger.info("Redis Ready");
  });

  client.on("error", (err: string) => {
    logger.info("Redis Error " + err);
  });

  return client;
};
