import { Router } from 'express';
import drawRouter from './draw';
import todoRouter from './todo';
import docRouter from './doc';
import userRouter from './user';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  console.log('對！這是API');
  res.send('對！這是API');
});


// apiRouter.use('/todo', todoRouter);
apiRouter.use('/draw', drawRouter);
// apiRouter.use('/doc', docRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;
module.exports = apiRouter;

