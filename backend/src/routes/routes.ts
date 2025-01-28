import { Router } from 'express';
import { AuthRoutes } from './auth';
import { MessageRoutes } from './message';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/message', MessageRoutes.routes);

    return router;
  }
}
