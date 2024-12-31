import express, { Response } from 'express';
import cors from 'cors';
import logger from './utils/logger';
import config from './config';
import rootRouter from './routes';

const server = express();
server.use(
  cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  }),
);
server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  }),
);

server.use('/api/v1', rootRouter);

server.get('/', (_, res: Response) => {
  res.send('Site is Working.');
});

server.listen(config.port, () => {
  logger.info(`App is listening on port ${config.port}`);
});
