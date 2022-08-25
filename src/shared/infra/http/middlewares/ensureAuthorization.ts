import auth from '@config/auth';
import { UsersTokensRepository } from '@modules/account/infra/typeorm/repositories/UsersTokensRepository';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../../../errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthorization(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing', 400);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      auth.SECRET_REFRESH_TOKEN,
    ) as IPayload;

    const userIdExist = await usersTokensRepository.findByUserIdAndRefreshToken(userId, token);

    if (!userIdExist) {
      throw new AppError('User not found', 404);
    }

    request.user = {
      id: userId,
    };

    next();
  } catch (err) {
    throw new AppError('Token invalid', 400);
  }
}
