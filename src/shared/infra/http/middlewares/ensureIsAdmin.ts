import { UserRepository } from '@modules/account/infra/typeorm/repositories/UserRepository';
import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/errors/AppError';

export async function ensureIsAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't admin!");
  }

  return next();
}
