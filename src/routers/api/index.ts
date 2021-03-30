import { Router } from 'express';
import drawRouter from './draw';
import userRouter from './user';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  console.log('對！這是API');
  res.send('對！這是API');
});


apiRouter.use('/draw', drawRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;
module.exports = apiRouter;

