import { Router } from 'express';
import { AuthMiddleWare } from '../middlewares/auth';
import { MessageController } from '../controllers/message/controller';

export class MessageRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new MessageController();

    router.get('/users', [AuthMiddleWare.validateJWT], controller.getAllUsers);
    router.get('/:id', [AuthMiddleWare.validateJWT], controller.getMessages);

    router.post(
      '/send/:id',
      [AuthMiddleWare.validateJWT],
      controller.sendMessage
    );

    return router;
  }
}
