import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '../config/envs';
import { Response } from 'express';

export function generateToken(payload: any, res: Response) {
  const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: '1d' });

  res.cookie('access_token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: NODE_ENV === 'production',
  });

  return token;
}
