import { StatusCodes as StatusCode } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import * as _ from 'lodash';
import UserModel from '../../models/User';
import rateLimiter from '../../middlewares/rateLimiter';
import logger from '../../shared/logger';

const router = Router();

router.get('/', rateLimiter, (req: Request, res: Response) => {
  logger.info(`[*] <<< ${req.ip}`)
  res.json({ "matched": [], "wishCountdown": 0, "accept": false, "bothAccept": false, "memberId": 0, "matchedAt": "2021-03-15T00:00:00.000Z", "dcard": { "gender": "M", "department": "電機工程研究所", "school": "國立臺灣海洋大學", "grade": "畢業", "talent": "畫畫，拍照，運動，寵物", "club": "", "lecture": "", "lovedCountry": "Japan", "trouble": "累", "wantToTry": " ", "exchange": "畫畫，拍照", "workExperience": "", "bloodType": "", "avatar": "https://upload.wikimedia.org/wikipedia/commons/f/f8/Dcard_Favicon_x520.png" } })
})

router.get('/random',rateLimiter, async (req: Request, res: Response) => {
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

router.get('/info', (req: Request, res: Response) => {
  res.status(StatusCode.OK).json({ users: "req", text: "asas" });
});

router.get('/a', (req, res) => res.send('Hello'));

export default router;
module.exports = router;

