import { StatusCodes as StatusCode } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import * as _ from 'lodash';
import UserModel from '../../models/User';
import rateLimiter from '../../middlewares/rateLimiter';
import resetTime from '../../middlewares/resetTime';

import logger from '../../shared/logger';
import example from "../../../example.json";

const router = Router();

router.get('/', rateLimiter, (req: Request, res: Response) => {
  logger.info(`[*] <<< ${req.ip}`)
  res.json(example)
})

router.get('/random', rateLimiter, async (req: Request, res: Response) => {
  const count = await UserModel.estimatedDocumentCount();
  if (count) {
    const user = await UserModel.find({}).limit(1).skip(_.random(1, count, false));
    return res.status(HttpStatusCodes.OK).json(user);
  }
  return res.status(HttpStatusCodes.ACCEPTED).send('Failed to calculate the number of documents');
});

router.get('/test', rateLimiter, (req: Request, res: Response) => {
  res.send('/DRAW/test');
})

router.get('/time', resetTime, (req: Request, res: Response) => {
  res.json({
    'msg': 'X-RateLimit-Reset',
  });
})

router.get('/info', (req: Request, res: Response) => {
  res.status(StatusCode.OK).json({ users: "req", text: "asas" });
});

router.get('/a', (req, res) => res.send('Hello'));

export default router;
module.exports = router;

