import { Router } from 'express';
import { AuthController } from '../controllers/auth/controller';
import { AuthMiddleWare } from '../middlewares/auth';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new AuthController();

    router.post('/signup', controller.signup);
    router.post('/login', controller.login);
    router.post('/logout', controller.logout);

    router.put(
      '/update-profile',
      [AuthMiddleWare.validateJWT],
      controller.updateProfile
    );

    router.get('/check', [AuthMiddleWare.validateJWT], controller.checkAuth);

    return router;
  }
}
