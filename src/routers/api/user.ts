import express, { Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import * as _ from 'lodash';
import UserModel from '../../models/User';
import UserController from '../../controller/user.controller';

const router = express.Router();
router.get('/count', async (req: Request, res: Response) => {
  const count = await UserModel.estimatedDocumentCount();
  if (count) {
    return res.status(HttpStatusCodes.OK).send(`calculate the number of documents${count.toString()}`);
  }
  return res.status(HttpStatusCodes.OK).send('Failed to calculate the number of documents');
});

router.get('/random', async (req: Request, res: Response) => {
  const count = await UserModel.estimatedDocumentCount();
  if (count) {
    const user = await UserModel.find({}).limit(1).skip(_.random(1, count, false));
    return res.status(HttpStatusCodes.OK).send(user);
  }
  return res.status(HttpStatusCodes.ACCEPTED).send('Failed to calculate the number of documents');
});

router.get('/hi', async (req: Request, res: Response) => res.status(200).send('hi'));

router.get('/', async (req: Request, res: Response) => {
  UserModel.find({}).then((user) => {
    if (!user) { return res.sendStatus(404); }
    return res.status(200).send(user);
  }).catch();
});

router.get('/all', async (req: Request, res: Response) => {
  const user = await UserModel.find({});
  return res.status(200).send(user);
});

router.get('/addOneUser', async (req: Request, res: Response) => {
  const json = {
    age: 25,
    name: '梁浩宇',
    gender: 'male',
    school: {
      代碼: 1044,
      學校名稱: '聖約翰科技大學',
      '公/私立': '私立',
      縣市名稱: '[01]新北市',
      地址: '[251]新北市淡水區淡金路四段499號',
      電話: '(02)28013131#7011',
      網址: 'http://www.sju.edu.tw/',
      體系別: '[2]技職',
    },
    dept: { 學系: '電影創作學系' },
    talent: { ID: '332', Hobby: '志願者', Category: '慈善事業' },
    hobby: [
      { ID: '170', Hobby: '假冒', Category: '表演藝術' },
      { ID: '258', Hobby: '讀老人', Category: '慈善事業' },
      { ID: '239', Hobby: '煙斗抽煙', Category: '食物和飲料' },
    ],
    club: '高科技社',
    lovedCountry: 'Belize',
    trouble: '興奮的',
    wantToTry: '融合',
    exchange: [
      { ID: '235', Hobby: '攝影', Category: '工藝品' },
      { ID: '60', Hobby: '野營', Category: '戶外活動' },
    ],
    avatar: 'https://avatars1.githubusercontent.com/u/83303443',
  };

  const addOneUser = UserModel.create(json, (error, docs) => {
    if (error) {
      console.log(error);
    } else {
      console.log('save ok');
      console.log(docs);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  });
  return res.status(HttpStatusCodes.OK).send(addOneUser);
});

router.post('/setuser', async (req: Request, res: Response) => {
  // console.log(req.body);
  const user = await UserController.CreateUser(req.body);
  return res.status(HttpStatusCodes.OK).send({ user });
});

router.post('/setmore', async (req: Request, res: Response) => {
  // console.log(req.body);
  const user = await UserModel.create(req.body);
  return res.status(HttpStatusCodes.OK).send({ user });
});

router.post('/set', async (req: Request, res: Response) => {
  // console.log(req.body);
  const user = await UserModel.create(req.body);
  return res.status(HttpStatusCodes.OK).send({ user });
});
export default router;
