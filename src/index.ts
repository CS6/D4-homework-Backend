// import './pre-start'; // Must be the first import
import app from './app';
import logger from './shared/logger';
import { connectToMongo } from './databases/MongoConnection';

connectToMongo();

const port = Number(process.env.PORT || 3000);

const server = app.listen(port, () => {
  logger.info(`Express server started on port: ${port}or http://localhost:${port}`);
});

app.on('error', logger.err);
export default server;
