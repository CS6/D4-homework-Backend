import express, { Request, Response } from 'express'
// import UserModel, { User } from '../../models/User';
import DocModel from '../../models/Doc';

import HttpStatusCodes, { StatusCodes } from 'http-status-codes';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const todo = await DocModel.find({})
  return res.status(200).send(todo)
})

router.get('/add', async (req: Request, res: Response) => {
  const { doc_Title, doc_ID } =  {doc_Title: "test1", doc_ID: "9"};


  const todo = DocModel.create([{doc_Title: doc_Title, doc_ID: doc_ID}], 
    function (error, docs) {
    if(error) {
    console.log(error);
    } else {
    console.log('save ok');
    console.log(docs);
    }
    });
  return res.status(201).send(todo)
})

// router.post('/todo', async (req: Request, res: Response) => {
//   const { title, description } = req.body;

//   const todo = DocModel.build({ title, description })
//   await todo.save()
//   return res.status(201).send(todo)
// })

// router.get('/findOne', async (req: Request, res: Response) => {
//   const doc_Title = '23123';
//   let dt = await UserModel.findOne({ doc_Title });
//   if (dt) {
//     return res.status(HttpStatusCodes.BAD_REQUEST).json({
//       errors: [
//         {
//           msg: "User already exists"
//         }
//       ]
//     });
//   } else {
//     return res.status(HttpStatusCodes.BAD_REQUEST).json({
//       errors: [
//         {
//           msg: "User not  exists"
//         }
//       ]
//     });
//   }
// })

// router.get('/findOneAndRemove', async (req: Request, res: Response) => {
//   const userId = '60572df815ddb37126b0e467';
//   try {
//     // Remove user
//     await UserModel.findOneAndRemove({ _id: userId });
//     res.json({ msg: "User removed" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
//   }
// })

// router.get('/test', async (req: Request, res: Response) => {
//   const { title, description } = {
//     title: 'title',
//     description: "description"
//   };
//   const dt = UserModel.create({
//     email: '23123',
//     password: '123123123',
//     avatar: '123123123',
//     date: 13123
//   })
//   // await dt.save()
//   return res.status(201).send(dt)
// })

export default router;
