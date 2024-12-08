import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Socket } from '@socket/socket';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private httpServer: ReturnType<typeof createServer>;
  private io: Server;

  constructor(socket: Socket, routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer, {
      transports: ['websocket', 'polling'],
      cors: {
        origin: ORIGIN,
        credentials: CREDENTIALS,
      },
      path: '/socket.io',
    });

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSocket(this.io, socket);
    this.initializeErrorHandling();
  }

  public listen() {
    this.httpServer.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on port ${this.port}`);
      console.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
  }

  private initializeSocket(io: Server, socket: Socket) {
    socket.initialize(io);
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
