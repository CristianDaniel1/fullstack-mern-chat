import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './middlewares/cors';

interface ServerOptions {
  app: any;
  port: number;
  routes: Router;
  clientPath: string;
}

export class Server {
  readonly app: any;
  private readonly port: number;
  private readonly routes: Router;
  private readonly clientPath: string;

  constructor(options: ServerOptions) {
    this.app = options.app;
    this.port = options.port;
    this.routes = options.routes;
    this.clientPath = options.clientPath;

    this.configure();
  }

  private configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(corsMiddleware());
    this.app.use(cookieParser());

    this.app.use(this.routes);
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}
