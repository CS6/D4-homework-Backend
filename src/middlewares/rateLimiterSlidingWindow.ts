import { Request, Response, NextFunction } from 'express';
import { getClientIp } from '../utils/getIpAddress';
import { connectToRedis } from '../databases/RedisConnection';

export default (req: Request, res: Response, next: NextFunction) => {
  const redisClient = connectToRedis();
  const ipAddress = getClientIp(req);
  const maxCallsPerHour = 1000;
  const slidingWindowSec = 1 * 60 * 60 * 1000;
  const now = new Date().getTime();
  const accessToken = '1231412414';

  redisClient
    .multi()
    .zrangebyscore(ipAddress, 0, now - slidingWindowSec)
    .zrange(ipAddress, 0, -1)
    .zadd(ipAddress, now, now)
    .expire(ipAddress, slidingWindowSec)
    .ttl(ipAddress)
    .exec((err: any, result: any) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      const timestamps = result[1];
      const remaining = Math.max(0, maxCallsPerHour - timestamps.length);

      if (remaining > 0) {
        res.setHeader('X-Rate-Limit-Limit', 1000);
        res.setHeader('X-RateLimit-Remaining', remaining);
        res.setHeader('X-RateLimit-Reset', remaining);
        return next();
        // return res.status(200).send(`${ipAddress}Allowed and remaining${now} BY ${remaining}`);
      }
      res.setHeader('X-Rate-Limit-Limit', 1000);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', remaining);
      return res.status(429).send(`${ipAddress} Not allowed${accessToken}`);
    });
};
