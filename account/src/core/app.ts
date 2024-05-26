import { createServer, Server } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import morganMiddleware from '../middlewares/morganMiddleware';
import sequelize from '../providers/db';
import routes from '../routes';
import logger from '../utils/logger';

class App {
  public port: number;

  public host: string;

  private readonly app: express.Application;

  private server: Server;

  private sequelize: Sequelize;

  constructor(port = 8001, host = 'localhost') {
    this.host = String(process.env.HOST) || host;
    this.port = Number(process.env.PORT) || port;

    this.app = this.createApp();
    this.server = this.createServer();
    this.sequelize = sequelize;
  }

  private createApp(): express.Application {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(morganMiddleware);
    app.use('/', routes);

    return app;
  }

  private createServer(): Server {
    return createServer(this.app);
  }

  public start(): void {
    this.server.listen(this.port, () => {
      logger.info(
        `The microservice is launched at http://${this.host}:${this.port} Documentation: http://${this.host}:${this.port}/docs`,
      );
    });
  }
}

export default App;
