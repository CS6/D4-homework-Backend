import app from './app';
import logger from './shared/logger';
import config from './config';
import { connectToMongo } from './databases/MongoConnection';
connectToMongo();

const port = Number(process.env.PORT || 3000);

const server = app.listen(port, () => {
  logger.info(`Express server started on port: ${port}or http://localhost:${port} ${config.mongodb} ${config.redis} ${process.env.NODE_ENV} ${config.version}`);
});

app.on('error', logger.err);
export default server;
