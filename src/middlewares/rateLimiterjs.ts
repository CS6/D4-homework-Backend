import { Request, Response, NextFunction } from 'express';
import { getClientIp } from '../utils/getIpAddress';
import { connectToRedis } from '../databases/RedisConnection';

export default (req: Request, res: Response, next: NextFunction) => {
  const redisClient = connectToRedis();
  const ipAddress = getClientIp(req);
  redisClient
    .multi()
    // .set([ipAddress, 0, 'EX', 3600, 'NX'])
    .set(ipAddress, '0', 'EX', 3600, 'NX') // NX -> 只有 key 不存在才會設立
    .incr(ipAddress)
    .ttl(ipAddress)
    .exec((err: any, replies: any) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      const requestCount = replies[1];
      res.set({
        'X-RateLimit-Remaining': 1000 - requestCount,
        'X-RateLimit-Reset': replies[2],
      });

      if (requestCount > 1000) {
        return res.status(429).send('You sent too many requests in an hour!');
      }

      return next();
    });
};
