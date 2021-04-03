import { Request, Response, NextFunction } from 'express';
import { getClientIp } from '../utils/getIpAddress';
import { connectToRedis } from '../databases/RedisConnection';

export default (req: Request, res: Response, next: NextFunction) => {
  const redisClient = connectToRedis();
  const ipAddress = getClientIp(req);
  redisClient
    .multi()
    .ttl(ipAddress)
    .exec((err: any, resetTime:any) => {
      console.log("resetTime",resetTime);
      console.log(err);
      if (resetTime==-2) {
        res.set({
          'X-RateLimit-Reset': 'No access record found',
        });  
        res.json({
          'msg': 'X-RateLimit-Reset',
          'data': 'No access record found',
        });
      }
      res.set({
        'X-RateLimit-Reset': resetTime,
      });  
      res.json({
        'msg': 'X-RateLimit-Reset',
        'data': resetTime,
      });
    });
};
