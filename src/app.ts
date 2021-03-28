/* eslint-disable @typescript-eslint/no-use-before-define */
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import 'express-async-errors';
import cors from 'cors';
import logger from './shared/logger';
import apiRouter from './routers/api';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(...helpers());

// API Endpoints
app.get('/', (req, res) => {
  res.send('Hi');
});

app.use('/api', apiRouter);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.on('error', (err) => { logger.err(err, false); });

function logErrors(err: Error, req: Request, res: Response, next: (arg0: Error) => void) {
  logger.err(err.stack, false);
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err: Error, req: Request, res: Response, next: (arg0: Error) => void) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err: Error, req: Request, res: Response, next: any) {
  if (res.headersSent) {
    return next(err);
  }
  // console.log("err",err)
  logger.err(err, false);
  // res.status(500).json({ error: err.message });
  return res.status(500).send({ error: 'Something failed!' });
}

function* helpers() {
  if (process.env.NODE_ENV === 'development') {
    yield morgan('dev');
  }

  if (process.env.NODE_ENV === 'production') {
    yield helmet();
  }
}

export default app;

module.exports = app;
