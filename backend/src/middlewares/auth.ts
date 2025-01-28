import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/envs';
import { UserModel } from '../models/user.model';

export class AuthMiddleWare {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.cookies.access_token;

      if (!authorization)
        return res
          .status(401)
          .json({ message: 'Unauthorized - No token provided' });

      const decoded = jwt.verify(authorization, JWT_SECRET!) as {
        id: string;
      } | null;

      if (!decoded) {
        return res
          .status(401)
          .json({ message: 'Unauthorized - Invalid token' });
      }

      const user = await UserModel.findById(decoded.id);

      if (!user) return res.status(404).json({ message: 'User not found' });

      req.body.user = user;

      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
