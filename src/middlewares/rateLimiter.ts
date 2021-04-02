import * as fs from 'fs';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';
import { getClientIp } from '../utils/getIpAddress';
import { connectToRedis } from '../databases/RedisConnection';
import logger from '../shared/logger';
// import slidingWindow from './plugin/slidingWindow';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { ip } = req;
  const redisClient = connectToRedis();
  const ipAddress = getClientIp(req);
  const maxCallsPerHour = 1000;
  const slidingWindowSec = 1 * 60 * 60 * 1000;
  const now = new Date().getTime();
  const accessToken = '1231412414';
  const luaScriptTextFilePath = path.resolve('./src/middlewares/plugin/slidingWindow.lua');
  const luaScriptText = (await fs.promises.readFile(luaScriptTextFilePath)).toString();
  try {
    return redisClient
      .multi()
      .eval(luaScriptText, 1, ipAddress, now, slidingWindowSec, maxCallsPerHour)
      .exec((err: any, result: any[]) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [[remainingCount, resetTime, difference]] = result;
        if (remainingCount < 1) {
          return res.status(429).send(`${result}:${ipAddress} Not allowed${accessToken}`);
        }
        logger.info(`[*] <<< ${ip} connecting, remaining ${result}`);
        res.setHeader('X-RateLimit-Limit', 1000);
        res.setHeader('X-RateLimit-Remaining', remainingCount);
        res.setHeader('X-RateLimit-Reset', Math.max(0, resetTime));
        return next();
      });
  } catch (error) {
    return res.status(500).send('我拒絕你的連線');
  }
};
