import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/account/repositories/implementations/UserRepository";

interface IPayload {
  sub: string;
}

export function ensureAuthorization(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 400);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "8d1974398f2164000c5e2491e08b628b"
    ) as IPayload;

    const userRepository = new UserRepository();

    const userIdExist = userRepository.findById(userId);

    if (!userIdExist) {
      throw new AppError("User not found", 404);
    }

    request.user = {
      id: userId,
    };

    next();
  } catch (err) {
    throw new AppError("Token invalid", 400);
  }
}
